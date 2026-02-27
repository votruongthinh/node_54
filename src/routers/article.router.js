import express from "express";

import { articleController } from "../controllers/article.controller.js";

const articleRouter = express.Router();

articleRouter.get(
  "",
  // (req, res, next) => {
  //   const payload = "dữ liệu của mid 1";

  //   req.payload = payload;

  //   if (false) {
  //     const response = responseSuccess(
  //       null,
  //       "Người dùng này không hợp lệ",
  //       401
  //     );
  //     res.status(response.statusCode).json(response);
  //   } else {
  //     next();
  //   }
  // },
  // (req, res, next) => {
  //   console.log("mid2");
  //   console.log(req.payload);
  //       // (new Error).
  //       throw new Error("lỗi rồi");
  //       next();
  // },
  // (req, _, next) => {
  //   console.log("mid3");
  //   console.log(req.payload);
  //       next();
  // },
  articleController.findAll
);

export default articleRouter;
