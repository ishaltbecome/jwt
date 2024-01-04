const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

const sequelize = require('./sequelize')

exports.Role = sequelize.define('role', {
  roleName: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'roles'
})

exports.User = sequelize.define('user', {
  login: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'roles',
      key: 'id'
    }
  }
}, {
  sequelize,
  timestamps: false,
  tableName: 'users',
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, 10)
    }
  }
})
