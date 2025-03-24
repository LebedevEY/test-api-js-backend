const { Router } = require("express");
const actions = require("./users.actions");
const validator = require("./users.validator");

module.exports = Router().post(
  "/users/auth",
  ...validator.getAuth,
  actions.getAuth
);
