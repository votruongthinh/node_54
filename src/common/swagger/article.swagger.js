export const article = {
  "/article": {
    get: {
      summary: "[Article]",
      description: "Optional extended description in CommonMark or HTML.",
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            example: "1",
          },
        },
        {
          in: "query",
          name: "pageSize",
          schema: {
            type: "integer",
            example: "3",
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
  //tìm theo id của từng article
  "/article/{id}": {
    get: {
      summary: "[Article]",
      description: "Optional extended description in CommonMark or HTML.",
      parameters: [
        {
          in: "path",
          name: "idArticle",
          schema: {
            type: "integer",
            example: "1",
          },
        },
      ],
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
};
