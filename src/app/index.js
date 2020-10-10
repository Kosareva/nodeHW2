const config = require('../config');
const port = config.PORT || 3000;
const express = require('express');
const loaders = require('./loaders');
const { terminate } = require('../app/utils');

async function startServer() {
  const app = express();
  await loaders.init({ expressApp: app });
  const server = app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });

  const exitHandler = terminate(server);
  process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
  process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
  process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
  process.on('SIGINT', exitHandler(0, 'SIGINT'));
}

module.exports = startServer;
