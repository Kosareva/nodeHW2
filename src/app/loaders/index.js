const expressLoader = require('./express.loader');
const dbLoader = require('./db.loader');
const logger = require('../logger');

async function init({ expressApp: app }) {
  await dbLoader();
  logger.info('Connection has been established successfully');
  await expressLoader({ app });
  logger.info('Express app has been initialized');

  return { app };
}

module.exports = {
  init
};
