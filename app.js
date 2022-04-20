const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const generateShortURL = require('./utils/generateShortUrl')
const URL = require('./models/url')

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

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const mainUrl = 'http://localhost:3000/'
  const originUrl = req.body.url.trim()
  URL.findOne({ originUrl: originUrl })
    .lean()
    .then((url) => {
      if (!url) {
        shortUrl = generateShortURL(5)
        URL.create({
          originUrl,
          shortUrl,
        })
          .then(() => res.render('success', { shortURL: mainUrl + shortUrl }))
          .catch((error) => console.log(error))
      }
      else {
        res.render('success', { shortURL: mainUrl + url.shortUrl })
      }
    })
    .catch((error) => console.log(error))
})

app.get('/error', (req, res) => {
  res.render('error')
})

app.get('/:shorten', (req, res) => {
  const shortUrl = req.params.shorten
  URL.findOne({ shortUrl })
    .lean()
    .then((url) => {
      if (url) {
        res.redirect(url.originUrl)
      } else {
        res.redirect('/error')
      }
    })
    .catch((error) => console.log(error))
})


app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})