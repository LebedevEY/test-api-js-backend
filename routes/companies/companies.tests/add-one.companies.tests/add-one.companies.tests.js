/* eslint-disable security/detect-non-literal-fs-filename */
const _ = require("lodash");
const request = require("supertest");
const { app } = require("../../../../app");
const v = require("../../../../config").prefix;
const httpCodes = require("../../../../constants/http-codes");
const companyMethods = require("../../../../DB/sample-db/methods/company");
const requestAuth = require("../../../../middleware/request-auth.middleware");
const { Unauthorized } = require("../../../../constants/errors");

jest.mock("../../../../middleware/request-auth.middleware");
jest.mock("../../../../DB/sample-db/methods/company");

const requestBody = {
  name: "ООО Тестовая компания",
  businessEntity: "ООО",
  type: ["agent", "contractor"],
  address: "г. Москва, ул. Тестовая, д. 1",
};

describe("testing POST /companies", () => {
  beforeAll(async () => {
    // todo: установка соединения с тестовой БД
    // await database.connect();
    // @todo: загрузка тестовых данных в БД
    companyMethods.createOne.mockImplementation((data) => {
      return {
        id: 123,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
  });

  afterAll(async () => {
    // todo: удаление тестовых данных из тестовой БД
    // todo: закрытие соединения с БД
    // await database.disconnect();
    jest.restoreAllMocks();
  });

  describe("with authorization", () => {
    beforeAll(() => {
      requestAuth.isAuthorized.mockImplementation((req, res, next) => next());
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    test("error: 422 name parameter is required", async () => {
      const { status, body } = await request(app)
        .post(`/${v}/companies`)
        .send({
          ...requestBody,
          name: undefined,
        });

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "name: parameter has incorrect format",
      });
    });

    test("error: 422 businessEntity parameter is required", async () => {
      const { status, body } = await request(app)
        .post(`/${v}/companies`)
        .send({
          ...requestBody,
          businessEntity: undefined,
        });

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "businessEntity: parameter has incorrect format",
      });
    });

    test("error: 500 internal server error", async () => {
      jest.spyOn(companyMethods, "createOne").mockImplementationOnce(() => {
        throw new Error();
      });
      const { status, body } = await request(app)
        .post(`/${v}/companies`)
        .send(requestBody);

      expect(status).toBe(httpCodes.INTERNAL_ERROR);
      expect(body).toEqual({
        code: "INTERNAL_ERROR",
        message: "Internal unexpected server error",
      });
    });

    test("success", async () => {
      const { status, body } = await request(app)
        .post(`/${v}/companies`)
        .send(requestBody);

      expect(status).toBe(httpCodes.CREATED);
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("businessEntity");
      expect(body).toHaveProperty("type");
      expect(body).toHaveProperty("address");
    });
  });

  describe("without authorization", () => {
    beforeAll(() => {
      requestAuth.isAuthorized.mockImplementation((req, res, next) =>
        next(new Unauthorized())
      );
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    test("error: 401 unauthorized", async () => {
      const { status, body } = await request(app)
        .post(`/${v}/companies`)
        .send(requestBody);

      expect(status).toBe(httpCodes.UNAUTHORIZED);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        message: "Unauthorized request",
      });
    });
  });
});
