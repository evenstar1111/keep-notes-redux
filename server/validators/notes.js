const { check } = require("express-validator");

exports.validateCreateInput = [
  check("title")
    .not()
    .isEmpty()
    .withMessage("title can not be empty")
    .isLength({ max: 20 })
    .withMessage("please note, max length for title is 20")
    .isString()
    .withMessage("title must be a string"),

  check("description")
    .not()
    .isEmpty()
    .withMessage("description can not be empty")
    .isString()
    .withMessage("description must be a string"),
];

exports.validateEditInput = [
  check("_id").isString().withMessage("id must be  a string"),

  check("title")
    .not()
    .isEmpty()
    .withMessage("title can not be empty")
    .isString()
    .withMessage("title must be a string")
    .isLength({ max: 20 })
    .withMessage("title must not be greater than 20 characters"),

  check("description")
    .not()
    .isEmpty()
    .withMessage("description can not be empty")
    .isString()
    .withMessage("description must be a string"),

  check("status")
    .isString()
    .withMessage("status must be a string")
    .isLength({ max: 10 })
    .withMessage("status must not be greater than 10 characters"),
];
