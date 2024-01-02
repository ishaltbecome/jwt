const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const path = require('path')

const routes = require('./routes')

const PORT = 3000

const app = express()

app.set('view engine', 'ejs')

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
  .use(express.static(path.join(__dirname, 'public')))
  .use(routes)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))