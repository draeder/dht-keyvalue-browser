const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

const DhtKv = require('dht-keyvalue')

let opts = [
 {
  keep: true,
  keepAlive: 3600000
 }
]

let dkv = new DhtKv(opts)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('put', msg =>{
   dkv.put(msg, (err, hash, key) => {
    if(err) return socket.emit('put', err)
    socket.emit('put', `Put successful for key name: ${key}`)
   })
  })

  socket.on('get', key =>{
   dkv.get(key, (err, value) => {
    socket.emit('get', value)
   })
  })

  socket.on('update', msg => {
   let key = msg.key
   let value = msg.value
   dkv.update(key, value, updated => {
    if(updated){
     socket.emit('update', `Update successful for key name, ${key}.`)
    }
   })
  })

})


server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000')
})