var net = require('net')

var chatServer = net.createServer()
var clientList = []

chatServer.on('connection', function(client) {
  client.name = client.remoteAddress + ':' + client.remotePort
  client.write('Hi ' + client.name + '!\n')
  
  // Add each new connection to the client list
  clientList.push(client)

  // Whenever any client sends data, send it to the broadcast function
  client.on('data', function(data) {
    broadcast(data, client)
  })

  // When a client ends their connection, remove them from the client list
  client.on('end', function() {
    clientList.splice(clientList.indexOf(client), 1)
  })

  client.on('error', function(e) {
    console.log(e)
  })

})

function broadcast(message, client) {
  var cleanup = []
  clientList.forEach(function(currentClient) {
    if(client !== currentClient) {
      if(currentClient.writable) {
        currentClient.write(client.name + ' says: ' + message)
      } else {
        cleanup.push(currentClient)
        currentClient.destroy()
      }
    }

    // For each client in the client list, 
    cleanup.forEach(function(node) {
      clientList.splice(clientList.indeOf(node), 1)
    })

  })
}

chatServer.listen(4000)