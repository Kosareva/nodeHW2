const config = require('./config');

module.exports = {
  development: {
    dialect: 'postgres',
    database: 'hw2-dev',
    username: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432
  },
  production: {
    dialect: 'postgres',
    database: config.pg.DATABASE,
    username: config.pg.USER,
    password: config.pg.PASSWORD,
    host: config.pg.HOST,
    port: config.pg.PORT
  },
  test: {
    dialect: 'postgres',
    database: 'hw2-test',
    username: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5432
  }
};
