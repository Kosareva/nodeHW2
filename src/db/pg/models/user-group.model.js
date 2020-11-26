const { sequelize } = require('../../sequelize');
const { DataTypes, Model } = require('sequelize');
const User = require('./user.model');
const Group = require('./group.model');

class UserGroup extends Model {
}

UserGroup.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true
  }
}, {
  sequelize,
  modelName: 'UserGroup',
  paranoid: true
});

User.belongsToMany(Group, {
  through: UserGroup,
  foreignKey: 'userId'
});

Group.belongsToMany(User, {
  through: UserGroup,
  foreignKey: 'groupId'
});

module.exports = UserGroup;
