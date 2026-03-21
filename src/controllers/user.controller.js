import { responseSuccess } from "../common/helpers/response.helper.js";
import { userService } from "../services/user.service.js";

export const userController = {
  async findAll(req, res, next) {
    const result = await userService.findAll(req);
    const response = responseSuccess(
      result,
      `lấy user`
    );
    res.status(response.statusCode).json(response);
  },
  async findOne(req, res, next) {
   const result = await userService.findOne(req);
   const response = responseSuccess(
     result,
     `lấy từng user`
   );
   res.status(response.statusCode).json(response);
 },
  async avatarLocal(req, res, next) {
    try {
      const result = await userService.avatarLocal(req);
      const response = responseSuccess(
        result,
        `Create avatar local successfully`
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },

  async avatarCloud(req, res, next) {
    try {
      const result = await userService.avatarCloud(req);
      const response = responseSuccess(
        result,
        `create avatar cloud successfully`
      );
      res.status(response.statusCode).json(response);
    } catch (err) {
      next(err);
    }
  },
};
