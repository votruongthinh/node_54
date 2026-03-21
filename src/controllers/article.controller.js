import { articleService } from "../services/article.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const articleController = {
  async findAll(req, res, next) {
    //test kq mid
    //console.log("articleController", req.payload);
    //
    const result = await articleService.findAll(req);
    const response = responseSuccess(
      result,
      "Lấy danh sách article thành công",
      201
    );
    res.status(response.statusCode).json(response);
  },
  async create(req, res, next) {
    const result = await articleService.create(req);
    const response = responseSuccess(result, "Tạo article thành công");
    res.status(response.statusCode).json(response);
  },
  async update(req, res, next) {
    const result = await articleService.update(req);
    const response = responseSuccess(result, "cập nhật article thành công");
    res.status(response.statusCode).json(response);
  },
  async delete(req, res, next) {
    const result = await articleService.delete(req);
    const response = responseSuccess(result, "xóa article thành công");
    res.status(response.statusCode).json(response);
  },
  async findOne(req, res, next) {
    const result = await articleService.findOne(req);
    const response = responseSuccess(
      result,
      "Lấy chi tiết một artcile thành công",
      201
    );
    res.status(response.statusCode).json(response);
  },
};
