const sequelize = require('./sequelize')

const models = require('./models')

const bcrypt = require('bcrypt')

// sequelize.sync()

// models.Role.sync()

// models.Role.create({
//   roleName: 'admin'
// })

models.User.addHook('beforeCreate', async (user) => {
  user.password = await bcrypt.hash(user.password, 10)
})

models.User.create({
  login: 'qwerty',
  password: 'qwerty',
  roleId: 3
})

// models.User.sync()

// models.User.belongsTo(models.Role)

// models.User.findAll({include: models.Role})
//   .then(users => {
//     console.log(JSON.stringify(users, null, 2))
//   })