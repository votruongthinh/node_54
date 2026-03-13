import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";

export const authService = {
  // đăng ký
  async register(req) {
    // nhận dữ liệu từ FE gửi lên
    console.log(req.body);
    const { email, password, fullname } = req.body;

    // kiểm tra email có tồn tại trong db hay không
    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    // nếu người dùng tồn tại thì từ chối
    if (userExits) {
      throw new BadRequestException(
        "Người dùng đã tồn tại, vui lòng đăng nhập"
      );
    }
    const passwordHash = bcrypt.hashSync(password, 10);

    // tạo mới người dùng vào db
    const userNew = await prisma.users.create({
      data: {
        email: email,
        password: passwordHash, // lưu mật khẩu đã được mã hóa vào db
        fullname: fullname,
      },
    });

    console.log({ email, password, fullname, userExits, userNew });

    return true;
  },

  // đăng nhập
  async login(req) {
    const { email, password } = req.body;

    // kiểm tra email có tồn tại trong db hay không và
    // lấy ra thông tin người dùng bao gồm cả mật khẩu đã được mã hóa
    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
      omit: {
        password: false,
      },
    });
    // nếu người dùng không tồn tại thì từ chối
    if (!userExits) {
      throw new BadRequestException(
        "Người dùng không tồn tại, vui lòng đăng ký"
      );
    }
    // so sánh mật khẩu người dùng nhập vào với mật khẩu đã được mã hóa trong db
    const isPassword = bcrypt.compareSync(password, userExits.password);

    // nếu mật khẩu không chính xác thì từ chối
    if (!isPassword) {
      throw new BadRequestException(
        "Mật khẩu không chính xác, vui lòng thử lại"
      );
    }
    // tạo access token và refresh token
    const accessToken = tokenService.createAccessToken(userExits.id);
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

    if (!accessToken) {
      throw new UnauthorizedException("Không có accessToken để kiểm tra");
    }

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
