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
const getErrorHandlerMiddleware = require('../error-handling').middlewares.errorHandler;
const getJwtAuthMiddleware = require('../auth').middlewares.jwtAuthenticate;
const strategies = require('../auth').strategies;
const { responseTime } = require('../utils/middlewares');

async function load({ app }) {
  const logger = getLogger();
  const jwtAuthMiddleware = getJwtAuthMiddleware(passport);
  const errorHandlerMiddleware = getErrorHandlerMiddleware({ logger });
  app.use(responseTime({ logger }));
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

  app.use(errorHandlerMiddleware);
}

module.exports = load;
