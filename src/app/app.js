const express = require('express');
const loaders = require('./loaders');

async function initApp() {
  const { app } = await loaders.init({
    expressApp: express()
  });

  return app;
}

module.exports = initApp;
