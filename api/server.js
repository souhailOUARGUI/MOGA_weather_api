const express = require('express')
const cors = require('cors');
const env = require('dotenv').config()
const socketIO = require('socket.io')
const mongoose = require('mongoose')

const app = express()
const port = 3000;


//********** DB connection ************/
mongoose
  .connect(process.env.dbURL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())

const server = app.listen(port, () =>
  console.log(`server started, listening to port ${port}`)
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
