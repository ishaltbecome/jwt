const router = require('express').Router()

const models = require('./models')

router.get('/', (req, res) => {
  res.render('index', { title: 'Index' })
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

module.exports = router