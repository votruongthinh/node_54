
import { statusCodes } from "./status-code.helper.js"

 export const responseSuccess = (data, message ="OK", statusCode= statusCodes.OK)=>{
    return {
        status:"success",
        statusCode:statusCode,
        message:message,
        data:data,
    }
}
export const responseError = (message = "Internal Server Error", statusCode = statusCodes.INTERNAL_SERVER_ERROR, stack)=>{
    return {
         status:'error',
         statusCode: statusCode,
         message:message,
         stack: stack, // chỉ nên show ở môi trường developer, còn khi lên production thì tắt đi

    }
}