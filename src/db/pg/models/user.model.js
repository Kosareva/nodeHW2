const sequelize = require('../../sequelize');
const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
}

function encryptPasswordIfChanged(user) {
  if (user.changed('password')) {
    const salt = bcrypt.genSaltSync();
    user.set('password', bcrypt.hashSync(user.get('password'), salt));
  }
}

User.init({
  id: {
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true
  },
  login: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      len: [3, 30]
    },
    unique: {
      msg: 'This username is already taken'
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING(64),
    is: /^[0-9a-f]{64}$/i
  },
  age: {
    type: DataTypes.INTEGER,
    validate: {
      min: 4,
      max: 130
    }
  }
}, {
  sequelize,
  modelName: 'User',
  paranoid: true
});

User.prototype.isPasswordValid = function (password) {
  return bcrypt.compareSync(password, this.password);
};

User.beforeCreate(encryptPasswordIfChanged);
User.beforeBulkCreate((users = []) => {
  users.forEach(user => {
    encryptPasswordIfChanged(user);
  });
});
User.beforeUpdate(encryptPasswordIfChanged);

module.exports = User;
