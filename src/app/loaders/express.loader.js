const { mapErrors } = require('../utils');
const HttpStatus = require('http-status-codes');
const express = require('express');
const {
  userRoutes,
  groupRoutes,
  userGroupRoutes
} = require('../routes');

async function load({ app }) {
  app.use(express.json());
  app.use('/users', userRoutes);
  app.use('/groups', groupRoutes);
  app.use('/group-members', userGroupRoutes);

  app.use((req, res, next) => {
    const status = HttpStatus.NOT_FOUND;
    const err = {
      status: status,
      message: HttpStatus.getStatusText(status)
    };
    next(err);
  });

  app.use((err, req, res, next) => {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || HttpStatus.getStatusText(status);
    res.status(status)
      .json(mapErrors([{ message }]));
  });
  return app;
}

module.exports = load;
