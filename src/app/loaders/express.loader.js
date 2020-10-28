const { mapErrors } = require('../utils');
const HttpStatus = require('http-status-codes');
const express = require('express');
const {
  userRoutes,
  groupRoutes,
  userGroupRoutes
} = require('../routes');
const getLogger = require('../logger');

async function load({ app }) {
  const logger = getLogger();
  app.use(express.json());
  app.use('*', (req, res, next) => {
    logger.info(`${req.method} ${req.url} has been called`);
    next();
  });
  app.use('/users', userRoutes);
  app.use('/groups', groupRoutes);
  app.use('/group-members', userGroupRoutes);

  app.use((err, req, res, next) => {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || HttpStatus.getStatusText(status);
    logger.error(`${status}: ${message}`);
    res.status(status)
      .json(mapErrors([{ message }]));
  });
}

module.exports = load;
