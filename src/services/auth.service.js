import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const authService = {
    async register(req) {
        // nhận dữ liệu từ FE gửi lên
        const { email, password, fullname } = req.body;

        // kiểm tra email có tồn tại trong db hay không
        const userExits = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        // nếu người dùng tồn tại thì từ chối
        if (userExits) {
            throw new BadRequestException("Người dùng đã tồn tại, vui lòng đăng nhập");
        }

        // tạo mới người dùng vào db
        const userNew = await prisma.users.create({
            data: {
                email: email,
                password: password,
                fullname: fullname,
            },
        });

        console.log({ email, password, fullname, userExits, userNew });

        return true;
    },

    async login(req) {
        return `login`;
    },
};
