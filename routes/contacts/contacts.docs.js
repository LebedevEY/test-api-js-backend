const httpCodes = require("../../constants/http-codes");

module.exports = {
  "/contacts/{id}": {
    get: {
      tags: ["Contacts"],
      summary: "Получить контакт по ID",
      description: "Возвращает данные контакта по указанному ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID контакта",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        [httpCodes.OK]: {
          description: "Успешный ответ",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    example: 1,
                  },
                  firstname: {
                    type: "string",
                    example: "Иван",
                  },
                  lastname: {
                    type: "string",
                    example: "Иванов",
                  },
                  patronymic: {
                    type: "string",
                    example: "Иванович",
                  },
                  phone: {
                    type: "string",
                    example: "79161234567",
                  },
                  email: {
                    type: "string",
                    example: "ivanov@example.com",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
          },
        },
        [httpCodes.NOT_FOUND]: {
          description: "Контакт не найден",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    example: "NOT_FOUND",
                  },
                  message: {
                    type: "string",
                    example: "Contact not found",
                  },
                },
              },
            },
          },
        },
      },
    },
    patch: {
      tags: ["Contacts"],
      summary: "Обновить контакт",
      description: "Обновляет данные контакта по указанному ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID контакта",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstname: {
                  type: "string",
                  example: "Иван",
                },
                lastname: {
                  type: "string",
                  example: "Иванов",
                },
                patronymic: {
                  type: "string",
                  example: "Иванович",
                },
                phone: {
                  type: "string",
                  example: "79161234567",
                },
                email: {
                  type: "string",
                  example: "ivanov@example.com",
                },
              },
            },
          },
        },
      },
      responses: {
        [httpCodes.OK]: {
          description: "Успешный ответ",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    example: 1,
                  },
                  firstname: {
                    type: "string",
                    example: "Иван",
                  },
                  lastname: {
                    type: "string",
                    example: "Иванов",
                  },
                  patronymic: {
                    type: "string",
                    example: "Иванович",
                  },
                  phone: {
                    type: "string",
                    example: "79161234567",
                  },
                  email: {
                    type: "string",
                    example: "ivanov@example.com",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
          },
        },
        [httpCodes.NOT_FOUND]: {
          description: "Контакт не найден",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    example: "NOT_FOUND",
                  },
                  message: {
                    type: "string",
                    example: "Contact not found",
                  },
                },
              },
            },
          },
        },
      },
    },
    delete: {
      tags: ["Contacts"],
      summary: "Удалить контакт",
      description: "Удаляет контакт по указанному ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID контакта",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        [httpCodes.OK]: {
          description: "Успешное удаление",
          content: {
            "application/json": {
              schema: {
                type: "integer",
                example: 1,
                description: "Количество удаленных записей",
              },
            },
          },
        },
        [httpCodes.NOT_FOUND]: {
          description: "Контакт не найден",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  code: {
                    type: "string",
                    example: "NOT_FOUND",
                  },
                  message: {
                    type: "string",
                    example: "Contact not found",
                  },
                },
              },
            },
          },
        },
        [httpCodes.BAD_REQUEST]: {
          description: "Ошибка при удалении контакта",
          content: {
            "application/json": {
              schema: {
                type: "string",
                example: "Ошибка при удалении контакта",
              },
            },
          },
        },
      },
    },
  },
  "/contacts": {
    post: {
      tags: ["Contacts"],
      summary: "Создать новый контакт",
      description: "Создает новый контакт с указанными данными",
      security: [{ bearerAuth: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["firstname", "lastname", "phone"],
              properties: {
                firstname: {
                  type: "string",
                  example: "Иван",
                },
                lastname: {
                  type: "string",
                  example: "Иванов",
                },
                patronymic: {
                  type: "string",
                  example: "Иванович",
                },
                phone: {
                  type: "string",
                  example: "79161234567",
                },
                email: {
                  type: "string",
                  example: "ivanov@example.com",
                },
              },
            },
          },
        },
      },
      responses: {
        [httpCodes.CREATED]: {
          description: "Контакт успешно создан",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: {
                    type: "integer",
                    example: 1,
                  },
                  firstname: {
                    type: "string",
                    example: "Иван",
                  },
                  lastname: {
                    type: "string",
                    example: "Иванов",
                  },
                  patronymic: {
                    type: "string",
                    example: "Иванович",
                  },
                  phone: {
                    type: "string",
                    example: "79161234567",
                  },
                  email: {
                    type: "string",
                    example: "ivanov@example.com",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
