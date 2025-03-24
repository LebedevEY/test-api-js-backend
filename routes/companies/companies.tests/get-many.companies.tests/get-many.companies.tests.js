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

describe("testing GET /companies", () => {
  beforeAll(async () => {
    companyMethods.getMany.mockImplementation(() => [
      {
        id: 1,
        name: "Тестовая компания",
        shortName: "Тест",
        businessEntity: "ООО",
        type: ["agent"],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    // todo: установка соединения с тестовой БД
    // await database.connect();
    // @todo: загрузка тестовых данных в БД
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

    test("error: 422 sortByName parameter has incorrect format", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?sortByName=invalid`);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "sortByName: parameter has incorrect format",
      });
    });

    test("error: 422 sortByCreatedAt parameter has incorrect format", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?sortByCreatedAt=invalid`);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "sortByCreatedAt: parameter has incorrect format",
      });
    });

    test("error: 422 page parameter has incorrect format", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?page=0`);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "page: parameter has incorrect format",
      });
    });

    test("error: 422 limit parameter has incorrect format", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?limit=0`);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "limit: parameter has incorrect format",
      });
    });

    test("error: 500 internal server error", async () => {
      jest.spyOn(companyMethods, "getMany").mockImplementationOnce(() => {
        throw new Error();
      });
      const { status, body } = await request(app)
        .get(`/${v}/companies`);

      expect(status).toBe(httpCodes.INTERNAL_ERROR);
      expect(body).toEqual({
        code: "INTERNAL_ERROR",
        message: "Internal unexpected server error",
      });
    });

    test("success: get companies without parameters", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("success: get companies with filter by status", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?status=active`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("success: get companies with filter by type", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?type=agent`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("success: get companies with sorting by name", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?sortByName=true`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("success: get companies with reverse sorting by name", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?sortByName=false`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("success: get companies with sorting by createdAt", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?sortByCreatedAt=true`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("success: get companies with reverse sorting by createdAt", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?sortByCreatedAt=false`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("success: get companies with pagination", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?page=1&limit=10`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
    });

    test("success: get companies with all parameters", async () => {
      const { status, body } = await request(app)
        .get(`/${v}/companies?status=active&type=agent&sortByName=false&sortByCreatedAt=false&page=1&limit=10`);

      expect(status).toBe(httpCodes.OK);
      expect(Array.isArray(body)).toBe(true);
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
        .get(`/${v}/companies`);

      expect(status).toBe(httpCodes.UNAUTHORIZED);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        message: "Unauthorized request",
      });
    });
  });
});
