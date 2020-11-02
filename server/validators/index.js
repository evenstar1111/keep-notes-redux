const { validationResult } = require("express-validator");

exports.validationCheckResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array() });
  }

  next();
};
