const express = require('express')
const app = express()

const env = require('dotenv').config()
const socketIO = require('socket.io')

const mongoose = require('mongoose')

//********** DB connection ************/
mongoose
  .connect(process.env.dbURL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))
app.use(express.json())

const server = app.listen(3000, () =>
  console.log(`server started, listening to port ${3000}`)
)

// socket handler
const socketHandler = socketIO(server)

socketHandler.on('connection', (socket) => {
  console.log('client connected')
  socket.on('sendMessage', (msg) => {
    // console.log(msg)
    socket.broadcast.emit('mobile', msg)
    // socket.emit('sendMessage', 'hello testing event')
  })
  socket.on('disconnect', () => console.log('client disconnected'))
})

//********** routes managment ************/

const messagesRouter = require('./routes/metars')(socketHandler)
const usersRouter = require('./routes/users')

app.use('/messages', messagesRouter)
app.use('/users', usersRouter)
