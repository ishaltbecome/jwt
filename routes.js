const bcrypt = require('bcrypt')

const router = require('express').Router()

const models = require('./models')

router.get('/', (req, res) => {
  res.render('index', { title: 'Index' })
})

router.route('/login')
  .get((req, res) => {
    res.render('login', { title: 'Авторизация' })
  })

  .post(async (req, res) => {
    try {
      const user = await models.User.findOne({ where: { login: req.body.login } })
      console.log(user.dataValues);
    } catch (err) {
      res.json(err)
      console.log('пользователь не найден');
    }
  })

router.route('/roles')
  .get(async (req, res) => {
    try {
      const roles = await models.Role.findAll()
      res.render('roles', { title: 'Роли', roles })
    } catch (err) {
      console.log(err)
      res.json(err)
    }
  })

  .post(async (req, res) => {
    try {
      await models.Role.create(req.body)      
    } catch (err) {
      console.log(err)
      res.json(err)
    }
  })

router.delete('/roles/:id', async (req, res) => {
  try {
    await models.Role.destroy({ where: { id: req.params.id } })
  } catch (err) {
    console.log(err)
    res.json(err)
  }
})

router.route('/users')
  .get(async (req, res) => {
    try {
      const users = await models.User.findAll({ include: models.Role })
      const roles = await models.Role.findAll()
      res.render('users', { title: 'Пользователи', users, roles })
    } catch (err) {
      console.log(err)
      res.json(err)
    }
  })

  .post(async (req, res) => {
    try {
      await models.User.create(req.body)      
    } catch (err) {
      console.log(err)
      res.json(err)
    }
  })

router.delete('/users/:id', async (req, res) => {
  try {
    await models.User.destroy({ where: { id: req.params.id } })
  } catch (err) {
    console.log(err)
    res.json(err)
  }
})

models.User.belongsTo(models.Role)

module.exports = router