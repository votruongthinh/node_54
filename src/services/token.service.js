import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../common/constant/app.constant.js';
import { BadRequestException } from "../common/helpers/exception.helper.js";
export const tokenService = {
    createAccessToken(userId){
        if(!userId){
            throw new BadRequestException("Không tìm thấy userId để tạo token");
        }
        //
        const accessToken =  jwt.sign({userId: userId}, ACCESS_TOKEN_SECRET, {expiresIn:"1d"})
        return accessToken;
    },
    
    // verifyAccessToken(acccessToken, option) {
    //     const decode = jwt.verify(acccessToken, ACCESS_TOKEN_SECRET, option);
    //     return decode
    // },
    verifyAccessToken(accessToken,option){
        const decode = jwt.verify(accessToken,ACCESS_TOKEN_SECRET,option);
        return decode;
    }
}