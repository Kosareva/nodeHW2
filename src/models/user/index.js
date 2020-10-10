const userFactory = require('./user');
const { userValidator } = require('../../validator');

module.exports = userFactory(userValidator);
