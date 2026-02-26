import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../common/sequelize/connect.sequelize.js";

const Article = sequelize.define(
    "Article", // model name: tên cục bộ sử dụng trong sequelize
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        views: {
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull:false,
            references:{
                key: "id",
                model:"Users"
            }
        },
        deletedBy:{
            type: DataTypes.INTEGER,
            defaultValue:0
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        deletedAt:{
            type: "TIMESTAMP",
            defaultValue: null,
            allowNull:true,
    
        },
        createdAt:{
            type: "TIMESTAMP",
            allowNull:false,
            defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")

        },
        updatedAt:{
            type: "TIMESTAMP",
            allowNull:false,
            defaultValue:Sequelize.literal("CURRENT_TIMESTAMP")
        },
    },
    {
        //tableName: "Articles_demo", //tạo thêm bản với mảng rỗng [] khi chưa thêm dữ liệu
        tableName: "Articles",
        timestamps: false,
    },
);

await Article.sync()

export default Article
