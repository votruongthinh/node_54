export const auth = {
  "/auth/get-info": {
    get: {
      tags: ["Auth"],
      summary: "Get info user.",
      description: "Optional extended description in CommonMark or HTML.",

      responses: {
        200: {
          description: "ok",
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auth"],
      summary: "Login user.",
      description: "Optional extended description in CommonMark or HTML.",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  example:"truongthinh@gmail.com"
                },
                password: {
                  type: "string",
                  example:"123456789"
                },
              },
            },
          },
        },
      },

      parameters: [
        {
          in: "path",
          name: "id",
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
