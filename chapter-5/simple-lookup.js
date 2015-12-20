var dns = require('dns')

dns.lookup('google.com', 4, function(e, a) {
  console.log(a)
})