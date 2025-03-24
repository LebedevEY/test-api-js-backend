/* eslint-disable security/detect-non-literal-fs-filename */
const _ = require("lodash");
const request = require("supertest");
const { app } = require("../../../../app");
const v = require("../../../../config").prefix;
const httpCodes = require("../../../../constants/http-codes");
const contactMethods = require("../../../../DB/sample-db/methods/contact");
const requestAuth = require("../../../../middleware/request-auth.middleware");
const { Unauthorized, NotFound } = require("../../../../constants/errors");

jest.mock("../../../../middleware/request-auth.middleware");

describe("testing DELETE /contacts/:id", () => {
  beforeAll(async () => {
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

    test("error: 404 contact not found", async () => {
      jest.spyOn(contactMethods, "getOne").mockImplementationOnce(() => null);

      const { status, body } = await request(app).delete(`/${v}/contacts/1`);

      expect(status).toBe(httpCodes.NOT_FOUND);
      expect(body).toEqual({
        code: "NOT_FOUND",
        message: "Contact not found",
      });
    });

    test("error: 422 id parameter has incorrect format", async () => {
      const { status, body } = await request(app).delete(`/${v}/contacts/abc`);

      expect(status).toBe(httpCodes.UNPROCESSABLE_ENTITY);
      expect(body).toEqual({
        code: "UNPROCESSABLE_ENTITY",
        message: "id: parameter has incorrect format",
      });
    });

    test("error: 400 bad request", async () => {
      jest.spyOn(contactMethods, "getOne").mockImplementationOnce(() => ({
        id: 16,
        lastname: "Grimes",
        firstname: "Rick",
      }));
      
      jest.spyOn(contactMethods, "deleteOne").mockImplementationOnce(() => {
        return new Error("Ошибка при удалении контакта");
      });

      const { status, body } = await request(app).delete(`/${v}/contacts/16`);

      expect(status).toBe(httpCodes.BAD_REQUEST);
      expect(body).toEqual("Ошибка при удалении контакта");
    });

    test("success", async () => {
      jest.spyOn(contactMethods, "getOne").mockImplementationOnce(() => ({
        id: 16,
        lastname: "Grimes",
        firstname: "Rick",
      }));
      
      jest.spyOn(contactMethods, "deleteOne").mockImplementationOnce(() => 1);

      const { status, body } = await request(app).delete(`/${v}/contacts/16`);

      expect(status).toBe(httpCodes.OK);
      expect(body).toEqual(1);
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
      const { status, body } = await request(app).delete(`/${v}/contacts/16`);

      expect(status).toBe(httpCodes.UNAUTHORIZED);
      expect(body).toEqual({
        code: "UNAUTHORIZED",
        message: "Unauthorized request",
      });
    });
  });
});
