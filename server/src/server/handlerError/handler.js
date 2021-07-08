const { TokenExpiredError, JsonWebTokenError } = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize');
const { errorLoger } = require('../utils/errorLoger');

module.exports.tokenErrorHandler = (err, req, res, next) => {
  if (err instanceof TokenExpiredError) {
    err.status = 419;
    errorLoger(err);
    return res.status(419).send('Token expired');
  }

  if (err instanceof JsonWebTokenError) {
    err.status = 401;
    errorLoger(err);
    return res.status(401).send('Invalid token');
  }

  next(err);
};

module.exports.sequelizeErrorHandler = (err, req, res, next) => {
  if (err instanceof UniqueConstraintError) {
    const {
      errors: [{ message }],
    } = err;
    err.status = 409;
    errorLoger(err);
    return res.status(409).send({ message });
  }
  next(err);
};

module.exports.validationErrorHandler = () => {};

module.exports.basicErrorHandler = (err, req, res, next) => {
  if (!err.message || !err.status) {
    err.status = 500;
    return res.status(500).send('Server Error');
  }
  errorLoger(err);
  res.status(err.status).send(err.message);
};
