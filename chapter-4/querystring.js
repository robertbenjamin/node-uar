var URL = require('url')
var qs = require('querystring')

var myUrl = "http://ss.dev/api/v1/searchMusic?term=tyler&country=fr&limit=15"

function getQueries(url) {
  var queryString = URL.parse(url).query
  return qs.parse(queryString)
}

console.log("all queries:", getQueries(myUrl) )

console.log("term:", getQueries(myUrl).term )
console.log("country:", getQueries(myUrl).country )


/* Encoding a object to a query string */


var queryObject = {
  "term": "astronauts, etc",
  "country": "us",
  "limit": "7"
}

var encodedQuery = qs.encode(queryObject)

console.log("encoded query:", encodedQuery)