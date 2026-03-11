import { responseSuccess } from "../common/helpers/response.helper.js";
import { authService } from "../services/auth.service.js";

export const authController = {
   async register(req, res, next) {
      const result = await authService.register(req);
      const response = responseSuccess(result, `register auth successfully`);
      res.status(response.statusCode).json(response);
   },

   async login(req, res, next) {
      const result = await authService.login(req);
      const response = responseSuccess(true, `login auths successfully`);

      res.cookie("accessToken",result.accessToken) //cần đổi 
      res.cookie("refreshToken",result.refreshToken) // cần đổi


      res.status(response.statusCode).json(response);
   },
   async getInfo(req, res, next) {
      const result = await authService.getInfo(req);
      console.log("getinfo",req.user);
      const response = responseSuccess(result, `get info auths successfully`);
      res.status(response.statusCode).json(response);
   },
};
