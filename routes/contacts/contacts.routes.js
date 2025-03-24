const { Router } = require("express");
const actions = require("./contacts.actions");
const validator = require("./contacts.validator");

module.exports = Router()
  .get("/contacts/:id", ...validator.getOne, actions.getOne)
  .post("/contacts", ...validator.addOne, actions.addOne)
  .patch("/contacts/:id", ...validator.editOne, actions.editOne)
  .delete("/contacts/:id", ...validator.deleteOne, actions.deleteOne)
