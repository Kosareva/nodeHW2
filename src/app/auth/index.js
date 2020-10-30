const {
  jwt
} = require('./strategies');
const {
  jwtAuthenticate
} = require('./middlewares');

module.exports = {
  middlewares: {
    jwtAuthenticate
  },
  strategies: {
    jwt
  }
};
