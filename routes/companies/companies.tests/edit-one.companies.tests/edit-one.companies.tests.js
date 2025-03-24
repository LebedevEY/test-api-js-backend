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
};

describe("testing PATCH /companies/:id", () => {
  beforeAll(async () => {
    // todo: установка соединения с тестовой БД
    // await database.connect();
    // @todo: загрузка тестовых данных в БД
    companyMethods.getOne.mockImplementation((id) => {
      if (id === "999") {
        return null;
      }
      
      return {
        id: 12,
        name: "ООО Фирма «Перспективное захоронение»",
        shortName: "Перспективное захоронение",
        businessEntity: "ООО",
        type: ["agent", "contractor"],
        status: "active",
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });
    
    companyMethods.editOne.mockImplementation((id, data) => {
      if (id === "999") {
        return null;
      }
      
      return {
        id: 12,
        ...data,
        shortName: "Перспективное захоронение",
        type: ["agent", "contractor"],
        status: "active",
        photos: [],
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

    test("error: 404 company not found", async () => {
      const { status, body } = await request(app)
        .patch(`/${v}/companies/999`)
        .send(requestBody);

      expect(status).toBe(httpCodes.NOT_FOUND);
      expect(body).toEqual({
        code: "NOT_FOUND",
        message: "Company not found",
      });
    });

    test("error: 422 id parameter has incorrect format", async () => {
      const { status, body } = await request(app)
        .patch(`/${v}/companies/abc`)
        .send(requestBody);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "id: parameter has incorrect format",
      });
    });

    test("error: 500 internal server error", async () => {
      jest.spyOn(companyMethods, "editOne").mockImplementationOnce(() => {
        throw new Error();
      });
      const { status, body } = await request(app)
        .patch(`/${v}/companies/12`)
        .send(requestBody);

      expect(status).toBe(httpCodes.INTERNAL_ERROR);
      expect(body).toEqual({
        code: "INTERNAL_ERROR",
        message: "Internal unexpected server error",
      });
    });

    test("success", async () => {
      const { status, body } = await request(app)
        .patch(`/${v}/companies/12`)
        .send(requestBody);

      expect(status).toBe(httpCodes.OK);
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("businessEntity");
      expect(body).toHaveProperty("type");
      expect(body).toHaveProperty("photos");
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
        .patch(`/${v}/companies/12`)
        .send(requestBody);

      expect(status).toBe(httpCodes.UNAUTHORIZED);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        message: "Unauthorized request",
      });
    });
  });
});
