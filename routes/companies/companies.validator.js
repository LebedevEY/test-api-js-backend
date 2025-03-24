const path = require("path");
const { body, check, query } = require("express-validator");
const { UnprocessableEntity } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");
const logger = require("../../services/logger.service")(module);
const imageService = require("../../services/image.service");

const addOne =  [
  check("name").isString().withMessage({
    code: UnprocessableEntity,
    message: "name: parameter has incorrect format",
  }),
  check("businessEntity").isString().withMessage({
    code: UnprocessableEntity,
    message: "businessEntity: parameter has incorrect format",
  }),
  validate,
]

const getOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const getMany = [
  query("status").optional().isString().withMessage({
    code: UnprocessableEntity,
    message: "status: parameter has incorrect format",
  }),
  query("type").optional().isString().withMessage({
    code: UnprocessableEntity,
    message: "type: parameter has incorrect format",
  }),
  query("sortByName").optional().isBoolean().withMessage({
    code: UnprocessableEntity,
    message: "sortByName: parameter has incorrect format",
  }),
  query("sortByCreatedAt").optional().isBoolean().withMessage({
    code: UnprocessableEntity,
    message: "sortByCreatedAt: parameter has incorrect format",
  }),
  query("page").optional().isInt({ min: 1 }).withMessage({
    code: UnprocessableEntity,
    message: "page: parameter has incorrect format",
  }),
  query("limit").optional().isInt({ min: 1 }).withMessage({
    code: UnprocessableEntity,
    message: "limit: parameter has incorrect format",
  }),
  validate,
];

const editOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const addImage = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  body()
    .custom((_, { req }) => req.files?.file[0])
    .withMessage({
      code: UnprocessableEntity,
      message: "file: parameter is required",
    })
    .bail()
    .custom(async (_, { req }) => {
      const file = req.files.file[0];
      const fileExtension = path.extname(file.originalname).toLowerCase();
      const tempFilePath = file.path;

      const isAllowedExtension = [".png", ".jpg", ".jpeg", ".gif"].includes(
        fileExtension
      );
      if (!isAllowedExtension) {
        await imageService
          .removeImage(tempFilePath)
          .catch((err) => logger.error(err));
      }
      return isAllowedExtension;
    })
    .withMessage({
      code: UnprocessableEntity,
      message: "files.file: only image files are allowed to upload",
    }),
  validate,
];

const removeImage = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  check("image_name")
    .notEmpty()
    .withMessage((_, { path }) => ({
      code: UnprocessableEntity,
      message: `${path}: parameter is required`,
    })),
  validate,
];

module.exports = { addOne, getOne, getMany, editOne, addImage, removeImage };
