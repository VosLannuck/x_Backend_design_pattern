const http = require("http")
const WebSocketServer = require("websocket").server

PORT = 8999
let connections = []

const httpServer =  http.createServer()

// Pass the http server object so then the websocketServer will override req/res 
const websocket = new WebSocketServer({"httpServer": httpServer})

// Listen to TCP packet object
httpServer.listen(PORT, ()=> { console.log(`Server listening on port ${PORT}`)})

websocket.on("request", (request) => {
    
  const connection = request.accept(null, request.origin)
  connection.on("message", (message) => {
     // Event triggered by one of the connection
    
      connections.forEach( connect => connect.send(`User-${connection.socket.remotePort} Says: ${message.utf8Data}`) )

  })

  connections.push(connection)
  connections.forEach(c => c.send(`User ${connection.socket.remotePort} just connected`))
  
})


