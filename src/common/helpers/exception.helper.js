import { statusCodes } from "./status-code.helper.js"

export class BadRequestException extends Error{
    code = statusCodes.BAD_REQUEST;
    name = "BadRequestException";
    constructor(message="BadRequestException"){
        super(message);
    }
}

//401:(không đủ quyền truy cập)
// quy định với FE là khi người dùng gặp thì logout 
export class UnauthorizedException extends Error{
    code = statusCodes.UNAUTHORIZED;
    name = "UnauthorizedException";
    constructor(message="UnauthorizedException"){
        super(message);
    }
}
//403: quy định với FE là khi gặp thì gọi refresh-token
export class ForbiddenException extends Error{
    code = statusCodes.FORBIDDEN;
    name = "ForbiddenException";
    constructor(message="ForbiddenException"){
        super(message);
    }
}
//404: quy định với FE là khi gặp thì hiển thị lỗi "không tìm thấy"
export class NotfoundException extends Error{
    code = statusCodes.NOT_FOUND;
    name = "NotfoundException";
    constructor(message="NotfoundException"){
        super(message);
    }
}