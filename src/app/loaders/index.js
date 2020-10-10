const expressLoader = require('./express.loader');

async function init({ expressApp: app }) {
  await expressLoader({ app });
  console.log('express app has been initialized');
}

module.exports = {
  init
};
