const { Sequelize } = require('sequelize');
const config = require('../config');
const environment = config.NODE_ENV || 'development';
const sequelizeConfig = require('../sequelize.config')[environment].config;

module.exports = new Sequelize(sequelizeConfig);
