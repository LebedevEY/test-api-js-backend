const { OK } = require("../../../constants/http-codes");
const { internalError, unauthorizedError, unprocessableEntity, notFound } = require("../../../config/swagger/common-errors");

module.exports = {
  "/companies/{id}/image": {
    post: {
      summary: "Загрузка изображения компании",
      description: "Загружает изображение для указанной компании",
      tags: ["Companies"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            example: 12
          },
          description: "Идентификатор компании"
        }
      ],
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                image: {
                  type: "string",
                  format: "binary",
                  description: "Файл изображения"
                }
              }
            }
          }
        }
      },
      responses: {
        [OK]: {
          description: "Изображение успешно загружено",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    description: "Идентификатор компании",
                    example: 12
                  },
                  name: {
                    type: "string",
                    description: "Название компании",
                    example: "ООО Фирма «Перспективные захоронения»"
                  },
                  photos: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          description: "Имя файла",
                          example: "0b8fc462dcabf7610a91.png"
                        },
                        filepath: {
                          type: "string",
                          description: "Путь к файлу",
                          example: "0b8fc462dcabf7610a91.png"
                        },
                        thumbpath: {
                          type: "string",
                          description: "Путь к миниатюре",
                          example: "0b8fc462dcabf7610a91_160x160.png"
                        }
                      }
                    },
                    description: "Фотографии компании"
                  }
                }
              }
            }
          }
        },
        ...notFound,
        ...unprocessableEntity,
        ...unauthorizedError,
        ...internalError
      }
    },
    delete: {
      summary: "Удаление изображения компании",
      description: "Удаляет указанное изображение компании",
      tags: ["Companies"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
            example: 12
          },
          description: "Идентификатор компании"
        },
        {
          in: "query",
          name: "image_name",
          required: true,
          schema: {
            type: "string",
            example: "0b8fc462dcabf7610a91.png"
          },
          description: "Имя файла изображения для удаления"
        }
      ],
      responses: {
        [OK]: {
          description: "Изображение успешно удалено",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    description: "Идентификатор компании",
                    example: 12
                  },
                  name: {
                    type: "string",
                    description: "Название компании",
                    example: "ООО Фирма «Перспективные захоронения»"
                  },
                  photos: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: {
                          type: "string",
                          description: "Имя файла",
                          example: "0b8fc462dcabf7610a91.png"
                        },
                        filepath: {
                          type: "string",
                          description: "Путь к файлу",
                          example: "0b8fc462dcabf7610a91.png"
                        },
                        thumbpath: {
                          type: "string",
                          description: "Путь к миниатюре",
                          example: "0b8fc462dcabf7610a91_160x160.png"
                        }
                      }
                    },
                    description: "Фотографии компании"
                  }
                }
              }
            }
          }
        },
        ...notFound,
        ...unprocessableEntity,
        ...unauthorizedError,
        ...internalError
      }
    }
  }
};
