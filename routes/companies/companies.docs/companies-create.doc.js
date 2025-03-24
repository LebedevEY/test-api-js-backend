const { CREATED } = require("../../../constants/http-codes");
const { internalError, unauthorizedError, unprocessableEntity } = require("../../../config/swagger/common-errors");

module.exports = {
  "/companies": {
    post: {
      summary: "Создание новой компании",
      description: "Создает новую компанию с указанными данными",
      tags: ["Companies"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "type"],
              properties: {
                name: {
                  type: "string",
                  description: "Название компании",
                  example: "ООО Фирма «Перспективные захоронения»"
                },
                shortName: {
                  type: "string",
                  description: "Краткое название компании",
                  example: "Перспективные захоронения"
                },
                businessEntity: {
                  type: "string",
                  description: "Организационно-правовая форма",
                  example: "ООО"
                },
                type: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  description: "Типы компании",
                  example: ["agent", "contractor"]
                },
                status: {
                  type: "string",
                  description: "Статус компании",
                  example: "active"
                },
                contact: {
                  type: "object",
                  properties: {
                    lastname: {
                      type: "string",
                      description: "Фамилия",
                      example: "Гримес"
                    },
                    firstname: {
                      type: "string",
                      description: "Имя",
                      example: "Рик"
                    },
                    patronymic: {
                      type: "string",
                      description: "Отчество",
                      example: "Петрович"
                    },
                    phone: {
                      type: "string",
                      description: "Телефон",
                      example: "79162165588"
                    },
                    email: {
                      type: "string",
                      description: "Email",
                      example: "grigoriev@funeral.com"
                    }
                  },
                  description: "Контактные данные"
                }
              }
            }
          }
        }
      },
      responses: {
        [CREATED]: {
          description: "Компания успешно создана",
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
                  shortName: {
                    type: "string",
                    description: "Краткое название компании",
                    example: "Перспективные захоронения"
                  },
                  businessEntity: {
                    type: "string",
                    description: "Организационно-правовая форма",
                    example: "ООО"
                  },
                  type: {
                    type: "array",
                    items: {
                      type: "string"
                    },
                    description: "Типы компании",
                    example: ["agent", "contractor"]
                  },
                  status: {
                    type: "string",
                    description: "Статус компании",
                    example: "active"
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
                  },
                  contact: {
                    type: "object",
                    properties: {
                      id: {
                        type: "integer",
                        description: "Идентификатор контакта",
                        example: 16
                      },
                      lastname: {
                        type: "string",
                        description: "Фамилия",
                        example: "Гримес"
                      },
                      firstname: {
                        type: "string",
                        description: "Имя",
                        example: "Рик"
                      },
                      patronymic: {
                        type: "string",
                        description: "Отчество",
                        example: "Петрович"
                      },
                      phone: {
                        type: "string",
                        description: "Телефон",
                        example: "79162165588"
                      },
                      email: {
                        type: "string",
                        description: "Email",
                        example: "grigoriev@funeral.com"
                      }
                    },
                    description: "Контактные данные"
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    description: "Дата создания",
                    example: "2020-11-21T08:03:00Z"
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    description: "Дата обновления",
                    example: "2020-11-21T08:03:00Z"
                  }
                }
              }
            }
          }
        },
        ...unprocessableEntity,
        ...unauthorizedError,
        ...internalError
      }
    }
  }
};
