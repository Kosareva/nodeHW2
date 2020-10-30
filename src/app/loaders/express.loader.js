const { mapErrors } = require('../utils');
const HttpStatus = require('http-status-codes');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const {
  userRoutes,
  groupRoutes,
  userGroupRoutes,
  authRoutes
} = require('../routes');
const getLogger = require('../logger');
const strategies = require('../auth').strategies;
const jwtAuthMiddleware = require('../auth').middlewares.jwtAuthenticate(passport);

async function load({ app }) {
  const logger = getLogger();
  app.use(cors());
  app.use(express.json());
  app.use(passport.initialize());
  passport.use('jwt', strategies.jwt);
  app.use('*', (req, res, next) => {
    logger.info(`${req.method} ${req.url} has been called`);
    next();
  });
  app.use('/users', jwtAuthMiddleware, userRoutes);
  app.use('/groups', jwtAuthMiddleware, groupRoutes);
  app.use('/group-members', jwtAuthMiddleware, userGroupRoutes);
  app.use('/auth', authRoutes);

  app.use((err, req, res, next) => {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || HttpStatus.getStatusText(status);
    logger.error(`${status}: ${message}`);
    res.status(status)
      .json(mapErrors([{ message }]));
  });
}

module.exports = load;
