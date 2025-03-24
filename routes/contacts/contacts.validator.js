const { check, body } = require("express-validator");
const { UnprocessableEntity, BadRequest } = require("../../constants/errors");
const validate = require("../../middleware/validation.middleware");

const getOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const addOne = [
  check("company_id")
    .exists()
    .withMessage({
      code: BadRequest,
      message: "company_id is required",
    }),
  body()
    .custom((_, {req}) => ["phone", "email"].some(
        val => Object.keys(req.body).includes(val)
      ))
    .withMessage({
      code: BadRequest,
      message: "phone number or email is required",
    }),
  validate,
]

const editOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
];

const deleteOne = [
  check("id").isNumeric().withMessage({
    code: UnprocessableEntity,
    message: "id: parameter has incorrect format",
  }),
  validate,
]

module.exports = { getOne, editOne, addOne, deleteOne };
