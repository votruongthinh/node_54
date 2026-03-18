import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";

export const authService = {
  // đăng ký
  async register(req) {
    // nhận dữ liệu từ FE gửi lên
   // console.log(req.body);
   //1
    const { email, password, fullname } = req.body;

    //2 kiểm tra email có tồn tại trong db hay không
    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    //3 nếu người dùng tồn tại thì từ chối
    if (userExits) {
      throw new BadRequestException(
        "Người dùng đã tồn tại, vui lòng đăng nhập"
      );
    }
    //4 mã hóa mật khẩu trước khi lưu vào db
    const passwordHash = bcrypt.hashSync(password, 10);

    //5 tạo mới người dùng vào db
    const userNew = await prisma.users.create({
      data: {
        email: email,
        password: passwordHash, // lưu mật khẩu đã được mã hóa vào db
        fullname: fullname,
      },
    });
    //log kiểm tra
    console.log({ email, password, fullname, userExits, userNew });

    return true;
  },

  // đăng nhập
  async login(req) {
    //1 nhận dữ liệu từ FE gửi lên
    const { email, password } = req.body;

    //2 kiểm tra email có tồn tại trong db hay không và
    // lấy ra thông tin người dùng bao gồm cả mật khẩu đã được mã hóa
    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
      //  password hiện tại ẩn gloal (true)nên là trường nhạy cảm nên mặc định sẽ không trả về khi truy vấn,
      // muốn lấy ra thì phải (false )nó đi
      omit: {
        password: false,
      },
    });
    //3 nếu người dùng không tồn tại thì từ chối
    if (!userExits) {
      throw new BadRequestException(
        "Người dùng không tồn tại, vui lòng đăng ký"
      );
    }
    //4 so sánh mật khẩu người dùng nhập vào với mật khẩu đã được mã hóa trong db
    const isPassword = bcrypt.compareSync(password, userExits.password);

    //5 nếu mật khẩu không chính xác thì từ chối
    if (!isPassword) {
      throw new BadRequestException(
        "Mật khẩu không chính xác, vui lòng thử lại"
      );
    }
    //6 tạo access token và refresh token
    const accessToken = tokenService.createAccessToken(userExits.id);
    console.log("accessToken: ", accessToken);
    const refreshToken = tokenService.createRefreshToken(userExits.id);
    console.log(email, password, userExits, isPassword);
   
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },
  // lấy thông tin người dùng
  async getInfo(req) {
    console.log("getInfo service", req.user);
    return req.user;
  },

  //khi FE gọi khi accesstoken đang bị hết hạn
  async refreshToken(req) {
    const { accessToken, refreshToken } = req.cookies;
    //kiem tra xem có accessToken ko
    if (!accessToken) {
      throw new UnauthorizedException("Không có accessToken để kiểm tra");
    }
// kiểm tra xem có refreshToken ko  
    if (!refreshToken) {
      throw new UnauthorizedException("Không có refreshToken để kiểm tra");
    }
    //tại vì accessToken đang bị hết hạn ,FE đang muốn làm mới
    // cho nên không được kiểm tra hạn của accessToken {ignoreExpiration: true}
    const decodeAccessToken = tokenService.verifyAccessToken(accessToken, {
      ignoreExpiration: true,
    });
    
    const decodeRefreshToken = tokenService.verifyRefreshToken(refreshToken);

    if (decodeAccessToken.userId !== decodeRefreshToken.userId) {
      throw new UnauthorizedException("Token không hợp lệ");
    }
//
    const userExits = await prisma.users.findUnique({
      where: {
        id: decodeAccessToken.userId,
      },
    });

    console.log({
      accessToken,
      refreshToken,
      decodeAccessToken,
      decodeRefreshToken,
      userExits,
    });

   const accessTokenNew = tokenService.createAccessToken(userExits.id)
    const refreshTokenNew = tokenService.createRefreshToken(userExits.id)
    return {
      accessToken: accessTokenNew,
      refreshToken: refreshTokenNew,
    };
  },
};
