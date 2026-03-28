// import validationResult to collect validation outcomes from express-validator
const { validationResult } = require('express-validator');

// middleware to handle validation results for incoming requests
// centralise validation logic to avoid repeating error handling in each route
function validate(req, res, next) {
  const errors = validationResult(req);
  // if validation errors exist, return a 400 Bad Request response
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, msg: e.msg }))
    });
  }
  next();
}

// export middleware for reuse across different routes
module.exports = validate;