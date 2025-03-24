const { OK } = require("../../../constants/http-codes");
const { internalError, unauthorizedError, unprocessableEntity } = require("../../../config/swagger/common-errors");

module.exports = {
  "/companies": {
    get: {
      summary: "u041fu043eu043bu0443u0447u0435u043du0438u0435 u0441u043fu0438u0441u043au0430 u043au043eu043cu043fu0430u043du0438u0439",
      description: "u0412u043eu0437u0432u0440u0430u0449u0430u0435u0442 u0441u043fu0438u0441u043eu043a u043au043eu043cu043fu0430u043du0438u0439 u0441 u0432u043eu0437u043cu043eu0436u043du043eu0441u0442u044cu044e u0444u0438u043bu044cu0442u0440u0430u0446u0438u0438, u0441u043eu0440u0442u0438u0440u043eu0432u043au0438 u0438 u043fu0430u0433u0438u043du0430u0446u0438u0438",
      tags: ["Companies"],
      parameters: [
        {
          in: "query",
          name: "status",
          required: false,
          schema: {
            type: "string",
            example: "active"
          },
          description: "u0421u0442u0430u0442u0443u0441 u043au043eu043cu043fu0430u043du0438u0438 u0434u043bu044f u0444u0438u043bu044cu0442u0440u0430u0446u0438u0438"
        },
        {
          in: "query",
          name: "type",
          required: false,
          schema: {
            type: "string",
            example: "agent"
          },
          description: "u0422u0438u043f u043au043eu043cu043fu0430u043du0438u0438 u0434u043bu044f u0444u0438u043bu044cu0442u0440u0430u0446u0438u0438"
        },
        {
          in: "query",
          name: "sortByName",
          required: false,
          schema: {
            type: "boolean",
            example: true
          },
          description: "u0421u043eu0440u0442u0438u0440u043eu0432u043au0430 u043fu043e u0438u043cu0435u043du0438 (true - u043fu043e u0432u043eu0437u0440u0430u0441u0442u0430u043du0438u044e, false - u043fu043e u0443u0431u044bu0432u0430u043du0438u044e)"
        },
        {
          in: "query",
          name: "sortByCreatedAt",
          required: false,
          schema: {
            type: "boolean",
            example: false
          },
          description: "u0421u043eu0440u0442u0438u0440u043eu0432u043au0430 u043fu043e u0434u0430u0442u0435 u0441u043eu0437u0434u0430u043du0438u044f (true - u043fu043e u0432u043eu0437u0440u0430u0441u0442u0430u043du0438u044e, false - u043fu043e u0443u0431u044bu0432u0430u043du0438u044e)"
        },
        {
          in: "query",
          name: "page",
          required: false,
          schema: {
            type: "integer",
            minimum: 1,
            example: 1
          },
          description: "u041du043eu043cu0435u0440 u0441u0442u0440u0430u043du0438u0446u044b"
        },
        {
          in: "query",
          name: "limit",
          required: false,
          schema: {
            type: "integer",
            minimum: 1,
            example: 10
          },
          description: "u041au043eu043bu0438u0447u0435u0441u0442u0432u043e u044du043bu0435u043cu0435u043du0442u043eu0432 u043du0430 u0441u0442u0440u0430u043du0438u0446u0435"
        }
      ],
      responses: {
        [OK]: {
          description: "u0421u043fu0438u0441u043eu043a u043au043eu043cu043fu0430u043du0438u0439",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: {
                          type: "integer",
                          description: "u0418u0434u0435u043du0442u0438u0444u0438u043au0430u0442u043eu0440 u043au043eu043cu043fu0430u043du0438u0438",
                          example: 12
                        },
                        name: {
                          type: "string",
                          description: "u041du0430u0437u0432u0430u043du0438u0435 u043au043eu043cu043fu0430u043du0438u0438",
                          example: "u041eu041eu041e u0424u0438u0440u043cu0430 u00abu041fu0435u0440u0441u043fu0435u043au0442u0438u0432u043du044bu0435 u0437u0430u0445u043eu0440u043eu043du0435u043du0438u044fu00bb"
                        },
                        shortName: {
                          type: "string",
                          description: "u041au0440u0430u0442u043au043eu0435 u043du0430u0437u0432u0430u043du0438u0435 u043au043eu043cu043fu0430u043du0438u0438",
                          example: "u041fu0435u0440u0441u043fu0435u043au0442u0438u0432u043du044bu0435 u0437u0430u0445u043eu0440u043eu043du0435u043du0438u044f"
                        },
                        businessEntity: {
                          type: "string",
                          description: "u041eu0440u0433u0430u043du0438u0437u0430u0446u0438u043eu043du043du043e-u043fu0440u0430u0432u043eu0432u0430u044f u0444u043eu0440u043cu0430",
                          example: "u041eu041eu041e"
                        },
                        type: {
                          type: "array",
                          items: {
                            type: "string"
                          },
                          description: "u0422u0438u043fu044b u043au043eu043cu043fu0430u043du0438u0438",
                          example: ["agent", "contractor"]
                        },
                        status: {
                          type: "string",
                          description: "u0421u0442u0430u0442u0443u0441 u043au043eu043cu043fu0430u043du0438u0438",
                          example: "active"
                        },
                        photos: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: {
                                type: "string",
                                description: "u0418u043cu044f u0444u0430u0439u043bu0430",
                                example: "0b8fc462dcabf7610a91.png"
                              },
                              filepath: {
                                type: "string",
                                description: "u041fu0443u0442u044c u043a u0444u0430u0439u043bu0443",
                                example: "0b8fc462dcabf7610a91.png"
                              },
                              thumbpath: {
                                type: "string",
                                description: "u041fu0443u0442u044c u043a u043cu0438u043du0438u0430u0442u044eu0440u0435",
                                example: "0b8fc462dcabf7610a91_160x160.png"
                              }
                            }
                          },
                          description: "u0424u043eu0442u043eu0433u0440u0430u0444u0438u0438 u043au043eu043cu043fu0430u043du0438u0438"
                        },
                        contact: {
                          type: "object",
                          properties: {
                            id: {
                              type: "integer",
                              description: "u0418u0434u0435u043du0442u0438u0444u0438u043au0430u0442u043eu0440 u043au043eu043du0442u0430u043au0442u0430",
                              example: 16
                            },
                            lastname: {
                              type: "string",
                              description: "u0424u0430u043cu0438u043bu0438u044f",
                              example: "u0413u0440u0438u043cu0435u0441"
                            },
                            firstname: {
                              type: "string",
                              description: "u0418u043cu044f",
                              example: "u0420u0438u043a"
                            },
                            patronymic: {
                              type: "string",
                              description: "u041eu0442u0447u0435u0441u0442u0432u043e",
                              example: "u041fu0435u0442u0440u043eu0432u0438u0447"
                            },
                            phone: {
                              type: "string",
                              description: "u0422u0435u043bu0435u0444u043eu043d",
                              example: "79162165588"
                            },
                            email: {
                              type: "string",
                              description: "Email",
                              example: "grigoriev@funeral.com"
                            }
                          },
                          description: "u041au043eu043du0442u0430u043au0442u043du044bu0435 u0434u0430u043du043du044bu0435"
                        },
                        createdAt: {
                          type: "string",
                          format: "date-time",
                          description: "u0414u0430u0442u0430 u0441u043eu0437u0434u0430u043du0438u044f",
                          example: "2020-11-21T08:03:00Z"
                        },
                        updatedAt: {
                          type: "string",
                          format: "date-time",
                          description: "u0414u0430u0442u0430 u043eu0431u043du043eu0432u043bu0435u043du0438u044f",
                          example: "2020-11-23T09:30:00Z"
                        }
                      }
                    }
                  },
                  meta: {
                    type: "object",
                    properties: {
                      total: {
                        type: "integer",
                        description: "u041eu0431u0449u0435u0435 u043au043eu043bu0438u0447u0435u0441u0442u0432u043e u0437u0430u043fu0438u0441u0435u0439",
                        example: 100
                      },
                      page: {
                        type: "integer",
                        description: "u0422u0435u043au0443u0449u0430u044f u0441u0442u0440u0430u043du0438u0446u0430",
                        example: 1
                      },
                      limit: {
                        type: "integer",
                        description: "u041au043eu043bu0438u0447u0435u0441u0442u0432u043e u044du043bu0435u043cu0435u043du0442u043eu0432 u043du0430 u0441u0442u0440u0430u043du0438u0446u0435",
                        example: 10
                      },
                      pages: {
                        type: "integer",
                        description: "u041eu0431u0449u0435u0435 u043au043eu043bu0438u0447u0435u0441u0442u0432u043e u0441u0442u0440u0430u043du0438u0446",
                        example: 10
                      }
                    }
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
