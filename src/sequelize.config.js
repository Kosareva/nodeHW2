const config = require('./config');
const path = require('path');

module.exports = {
  development: {
    custom: {
      seeds: [
        path.resolve(__dirname, 'db/pg/seeds/users.seeds.js')
      ]
    },
    config: {
      dialect: 'postgres',
      database: 'hw2',
      username: 'postgres',
      password: 'admin',
      host: 'localhost',
      port: 5432
    }
  },
  production: {
    custom: {
      seeds: [
        path.resolve(__dirname, 'db/pg/seeds/users.seeds.js')
      ]
    },
    config: {
      dialect: 'postgres',
      database: config.pg.DATABASE,
      username: config.pg.USER,
      password: config.pg.PASSWORD,
      host: config.pg.HOST,
      port: config.pg.PORT
    }
  }
};
