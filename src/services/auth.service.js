import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";

export const authService = {
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
        password: passwordHash,
        fullname: fullname,
      },
    });

    console.log({ email, password, fullname, userExits, userNew });

    return true;
  },

  async login(req) {
    const { email, password } = req.body;

    const userExits = await prisma.users.findUnique({
      where: {
        email: email,
      },
      omit: {
        password: false,
      },
    });
    if (!userExits) {
      throw new BadRequestException(
        "Người dùng không tồn tại, vui lòng đăng ký"
      );
    }
    const isPassword = bcrypt.compareSync(password, userExits.password);

    if (!isPassword) {
      throw new BadRequestException(
        "Mật khẩu không chính xác, vui lòng thử lại"
      );
    }
    const accessToken = tokenService.createAccessToken(userExits.id);
    console.log(email, password, userExits, isPassword);
    return {
      accessToken: accessToken,
      refreshToken: "refressToken",
    };
  },
  async getInfo(req) {
    console.log("getInfo service", req.user);
    return req.user;
  },
};
