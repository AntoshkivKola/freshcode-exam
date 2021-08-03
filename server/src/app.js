const express = require('express');
const cors = require('cors');
const router = require('./server/router');
const ErrorHandlers = require('./server/handlerError/handler');

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config();
}

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/public', express.static('public'));
  app.use('/api', router);

  app.use(ErrorHandlers.tokenErrorHandler);
  app.use(ErrorHandlers.sequelizeErrorHandler);
  app.use(ErrorHandlers.basicErrorHandler);

  return app;
};

module.exports = createApp;
