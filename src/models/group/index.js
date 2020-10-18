const groupFactory = require('./group');
const permissions = require('./permissions');
const { groupValidator } = require('../../validator');

module.exports = {
  makeGroup: groupFactory(groupValidator),
  permissions
};
