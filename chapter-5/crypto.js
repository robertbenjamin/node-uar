var crypto = require('crypto')
var sha1 = crypto.createHash('sha1')

sha1.update('foo')

console.log( sha1.digest() )


// Public key cryptography
// Cipher: encrypts data
// Decipher: decrypts data
// Sign: creates cryptographic signature for data
// Verify: validates cryptographic signatures


// Cipher
// For encrypting data with a private key

var fs = require('fs')

var pem = fs.readFileSync('key.pem')
var key = pem.toString('ascii')

var cipher = crypto.createCipher('blowfish', key)

// Adding random data which happened to be in memory buffer
cipher.update(new Buffer(4), 'binary', 'hex')

// The blowfish algo uses 40-byte blocks, and its only on this second addition that this is filled. This will return a hex output unlike the last update
cipher.update(new Buffer(4), 'binary', 'hex')

// Not enough data, will again return an empty string like the first
cipher.update(new Buffer(4), 'binary', 'hex')

// Forces a return, so the output is padded and a hex is returned
cipher.final('hex')


// Decipher



// Sign



// Verify