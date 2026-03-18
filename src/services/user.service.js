import { BadRequestException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   secure: false
// });

export const userService = {
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
 
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({folder:"node54"},(error, uploadResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(uploadResult);
        })
        .end(req.file.buffer);
    });
    console.log({
      "req.file": req.file,
      "req.body": req.body,
      "req.user": req.user,
      "uploadResult": uploadResult
    });

    return `This action avatarCloud`;
  },
};
