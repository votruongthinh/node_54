import { prisma } from "../common/prisma/connect.prisma.js";
import sequelize from "../common/sequelize/connect.sequelize.js";
import Article from "../models/article.model.js";

// prisma của em tích hợp thành công rùi nà
// em xem tiếp các phần khác nha
// chỗ nào hông hiểu cứ nhắn anh nha
export const articleService = {
    async findAll (req){
        //kiem tra mid
        console.log("artcileService", req.payload);

        //prisma
        const resultPrisma = await prisma.articles.findMany()
        
        //sequelize
        const resultsSequelize = await Article.findAll();
        return resultPrisma
    },
}