const startApp = require('./app');
const config = require('./config');
const environment = config.NODE_ENV || 'development';
const seeds = require('./sequelize.config')[environment].custom.seeds;

(async () => {
  for (const seedsPath of seeds) {
    await require(seedsPath)();
  }
  console.log('Seeds have been created');
  await startApp();
})();
