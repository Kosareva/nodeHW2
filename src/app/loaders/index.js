const expressLoader = require('./express.loader');
const loggerLoader = require('./logger.loader');
const dbLoader = require('./db.loader');

async function init({ expressApp: app, logLevel, appName }) {
  const logger = await loggerLoader({ logLevel, appName });
  logger.info('logger has been initialized');
  await dbLoader();
  logger.info('Connection has been established successfully');
  await expressLoader({ app });
  logger.info('express app has been initialized');

  return {
    app,
    logger
  };
}

module.exports = {
  init
};
