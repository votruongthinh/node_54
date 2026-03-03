import { prisma } from "../common/prisma/connect.prisma.js";
import sequelize from "../common/sequelize/connect.sequelize.js";
import Article from "../models/article.model.js";

// prisma của em tích hợp thành công rùi nà
// em xem tiếp các phần khác nha
// chỗ nào hông hiểu cứ nhắn anh nha

// 4 nơi nhận dữ liệu từ FE gửi
// BODY
// PARAMS
// QUERY
// HEADERS

export const articleService = {
  async findAll(req) {
    // sequelize
    // const resultSequelize = await Article.findAll();

    let { page, pageSize } = req.query;

    const pageDefault = 1;
    const pageSizeDefault = 3;

    // ĐẢM BẢO LÀ SỐ
    page = Number(page);
    pageSize = Number(pageSize);

    // nếu gửi chữ
    page = Number(page) || pageDefault;
    pageSize = Number(pageSize) || pageSizeDefault;

    // nếu mà số âm
    if (page < 1) page = pageDefault;
    if (pageSize < 1) pageSize = pageSizeDefault;

    const index = (page - 1) * pageSize;

    console.log({ page, pageSize, index });

    const resultPrismaPromise = prisma.articles.findMany({
      where: {
        isDeleted: false,
      },
      skip: index, // skip tương đương với OFFSET
      take: pageSize, // take tương đương với LIMIT
    });
    const totalItemPromise = prisma.articles.count({
      where: {
        isDeleted: false,
      },
    });

    const [resultPrisma, totalItem] = await Promise.all([
      resultPrismaPromise,
      totalItemPromise,
    ]);

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      totalItem: totalItem,
      totalPage: totalPage,
      page: page,
      pageSize: pageSize,
      items: resultPrisma,
    };
  },

  //body
  //để nhận được body phải cài đặt middleware express.json() ở server.js
  //app.use(express.json())
  async create(req) {
    const body = req.body;
    console.log("body", { body });

    const articleNew = await prisma.articles.create({
      data: {
        title: body.title,
        content: body.content,
        userId: 1,
      },
    });
    return true;
  },
  //update
  async update(req) {
    const { articleId } = req.params;
    const body = req.body;

    const articleUpdate = await prisma.articles.update({
      where: {
        id: Number(articleId),
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    console.log({ articleId, body });

    return true;
  },
  async delete(req) {
    const { articleId } = req.params;
    prisma.articles.delete({
      where: {
        id: Number(articleId),
      },
      data: {
        isDeleted: true,
      },
    });
    return true;
  },
};
