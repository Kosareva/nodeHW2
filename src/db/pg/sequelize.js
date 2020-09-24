const { Sequelize } = require('sequelize');
const config = require('../../config');
const environment = config.NODE_ENV || 'development';
const sequelizeConfig = require('../../sequelize.config')[environment].config;

const sequelize = new Sequelize(sequelizeConfig);
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = new Sequelize(sequelizeConfig);
