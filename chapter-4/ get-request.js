var http = require('http')

var options = {
  host: 'www.google.com',
  port: 80,
  path: '/',
}

var req = http.get(options, function(res) {
  console.log(res)
  res.on('data', function(data) {
    console.log(data)
  })
})

req.end()