import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../common/constant/app.constant.js';
import { REFRESH_TOKEN_SECRET } from '../common/constant/app.constant.js';
import { BadRequestException } from "../common/helpers/exception.helper.js";
export const tokenService = {
    createAccessToken(userId){
        if(!userId){
            throw new BadRequestException("Không tìm thấy userId để tạo token");
        }
        //
        const accessToken =  jwt.sign({userId: userId}, ACCESS_TOKEN_SECRET, {expiresIn:"10s"})
        return accessToken;
    },
    createRefreshToken(userId){
        if(!userId){
            throw new BadRequestException("Không tìm thấy userId để tạo token");
        }
        //
        const refreshToken =  jwt.sign({userId: userId}, REFRESH_TOKEN_SECRET, {expiresIn:"1d"})
        return refreshToken;
    },
    
    // verifyAccessToken(acccessToken, option) {
    //     const decode = jwt.verify(acccessToken, ACCESS_TOKEN_SECRET, option);
    //     return decode
    // },
    // option có thể là {ignoreExpiration: true} để bỏ qua lỗi token hết hạn
    verifyAccessToken(accessToken,option){
        const decode = jwt.verify(accessToken,ACCESS_TOKEN_SECRET,option);
        return decode;
    },
    verifyRefreshToken(refreshToken,option){
        const decode = jwt.verify(refreshToken,REFRESH_TOKEN_SECRET,option);
        return decode;
    }
}