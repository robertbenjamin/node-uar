var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')

var app = express()
var server = http.createServer(app)

app.set('view engine', 'ejs')

app.listen(4000)

var tweets = []

app.get('/', function(req, res) {
  var title = 'Chirpie',
      header = 'Welcome to Chirpie'

  res.render('index', {
    locals: {
      'title': title,
      'header': header,
      'tweets': tweets,
      stylesheets: ['/public/style.css']
    }
  })
})

app.post('/send', bodyParser, function(req, res) {
  if (req.body && req.body.tweet) {

    tweets.push(req.body.tweet)

    if (acceptsHtml(req.headers['accept'])) {
      res.redirect('/', 302)
    } else {
      res.send({status: "ok", message: "Tweet received"})
    }

  } else {
    res.send({status: "nok", message: "No tweet received"})
  }
})

app.get('/tweets', function(req, res) {
  res.send(tweets)
})

function acceptsHtml(header) {
  var accepts = header.split(',')
  accepts.forEach(function(accept) {
    if (accept === 'text/html') { return true }
  })

  return false
}