const { DataTypes } = require('sequelize')

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