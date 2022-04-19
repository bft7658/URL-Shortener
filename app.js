const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const generateShortURL = require('./utils/generateShortUrl')


const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  console.log(generateShortURL(5))
  res.render('index')
})

app.post('/', (req, res) => {
  const shortURL = req.body.url.trim()
  res.render('success', { shortURL })
})

app.get('/:shorten', (req, res) => {
  const shortName = req.params.shorten
  console.log(`${shortName}`)
})

app.get('/error', (req, res) => {
  res.render('error')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})