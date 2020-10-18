const sequelize = require('../../sequelize');
const { DataTypes, Model } = require('sequelize');
const { permissions } = require('../../../models/group');
const { containsOnly } = require('../../../utils');

class Group extends Model {
}

Group.init({
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID
  },
  name: {
    type: DataTypes.STRING,
    unique: {
      msg: 'This group is already exists'
    }
  },
  permissions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    validate: {
      isValidPermissions: function (value) {
        return containsOnly(value, permissions.asArray());
      }
    }
  },
}, {
  sequelize,
  modelName: 'Group'
});

module.exports = Group;
