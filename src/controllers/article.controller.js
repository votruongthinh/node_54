import { articleService } from "../services/article.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const articleController = {
    async findAll (req,res,next){
        //test kq mid
        console.log("articleController", req.payload);
        //
       const result = await articleService.findAll(req);
       const response = responseSuccess(result,"Lấy danh sách article thành công",201);
       res.status(response.statusCode).json(response);
    }
    
};