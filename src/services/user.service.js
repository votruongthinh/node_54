import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import {buildQueryPrisma} from "../common/helpers/build-query-prisma-helper.js"
// cloudinary.config({
//   secure: false
// });

export const userService = {
  async findAll(req) {
    // sequelize
    // const resultSequelize = await Article.findAll();

    const { index, page, pageSize, where } = buildQueryPrisma(req);
    const resultPrismaPromise = prisma.users.findMany({
      where: where,
      skip: index, // skip tương đương với OFFSET
      take: pageSize, // take tương đương với LIMIT
    });
    const totalItemPromise = prisma.users.count({
      where: where,
    });

    const [resultPrisma, totalItem] = await Promise.all([
      resultPrismaPromise,
      totalItemPromise,
    ]);

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      totalItem: totalItem,
      totalPage: totalPage,
      page: page,
      pageSize: pageSize,
      items: resultPrisma,
    };
  },
  async findOne(req) {
    const { id } = req.params;

    const user = await prisma.users.findUnique({
        where: {
            id: Number(id),
        },
    });

    return user;
},
  async avatarLocal(req) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    if (!req.file) {
      throw new BadRequestException("Thiếu file");
    }

    if (req.user.avatar) {
      const oldFilePath = path.join("public/images/", req.user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      console.log({ oldFilePath });
      // path.join(req.user.avatar)
    }
    await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: req.file.filename,
      },
    });

    console.log({
      "req.file": req.file,
      "req.body": req.body,
      "req.user": req.user,
    });

    return `http://localhost:3069/images/${req.file.filename}`;
  },

  async avatarCloud(req) {
    if (!req.file) {
      throw new BadRequestException("Thiếu file");
    }

    // đảm bảo 1 user chỉ có 1 tấm hình avatar
    if (req.user.avatar) {
      // xoá local
      // win: \\
      // mac: //
      const oldFilePath = path.join("public/images/", req.user.avatar);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }

      // xoá cloud
      cloudinary.uploader.destroy(req.user.avatar);
    }
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "node54" }, (error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(req.file.buffer);
    });

    
    await prisma.users.update({
      where: {
        id: req.user.id,
      },
      data: {
        avatar: uploadResult.public_id,
      },
    });
    console.log({
      "req.file": req.file,
      "req.body": req.body,
      "req.user": req.user,
      uploadResult: uploadResult,
    });

    return uploadResult.secure_url;
  },
};
