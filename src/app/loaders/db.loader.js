const { sequelize } = require('../../db/sequelize');

async function load() {
  await sequelize.authenticate();
}

module.exports = load;
