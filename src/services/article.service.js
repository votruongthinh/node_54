import sequelize from "../common/sequelize/connect.sequelize.js";
import Article from "../models/article.model.js";
export const articleService = {
    async findAll (){
        const results = await Article.findAll();
        return results;
        
    },
}