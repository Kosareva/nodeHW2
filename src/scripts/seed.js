const config = require('../config');
const environment = config.NODE_ENV || 'development';
const seeds = require('../sequelize.config')[environment].custom.seeds;

(async () => {
  for (const seedsPath of seeds) {
    await require(seedsPath)();
  }
})()
  .then(() => console.log('Seeds have been created'))
  .catch(e => console.log('Can not create seeds: ', e.stackTrace))
  .finally(() => (process.exit(0)));
