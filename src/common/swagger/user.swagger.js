export const user = {
  "/user/avatar-local": {
    post: {
      tags: ["User"],
      summary: "[Upload avatar local for user]",
      description: "Optional extended description in CommonMark or HTML.",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                orderId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
                avatar: {
                  type: "string",
                  format: "binary",
                },
                filename: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary",
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
};
