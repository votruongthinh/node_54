import { statusCodes } from "./status-code.helper.js";
import { responseError } from "./response.helper.js";
import jwt from "jsonwebtoken";
//import { F } from "../helpers/exception.helper.js";
export const appError = (err, req, res, next) => {
  console.log("mid đặc biệt bắt lỗi", err);

  // choox nay em de JsonWebTokenError truoc
  if (err instanceof jwt.JsonWebTokenError) {
    // class JsonWebTokenError là bắt tất cả các lỗi liên quan tới token, không chừa bất kỳ một lỗi nào
    err.code = statusCodes.UNAUTHORIZED; // 401 FE sẽ logout người dùng
  }
  // cai nay TokenExpiredError  de sau
  if (err instanceof jwt.TokenExpiredError) {
    // class TokenExpiredError chỉ bắt lỗi HẾT HẠN liên quan tới token
    err.code = statusCodes.FORBIDDEN; // 403 sẽ gọi api refresh token
  }

  console.log({
    cause: err?.cause,
    message: err?.message,
    name: err?.name,
    stack: err?.stack,
    code: err?.code,
  });
  const response = responseError(err?.message, err?.code, err?.stack);
  console.log(response);
  res.status(response.statusCode).json(response);
};
