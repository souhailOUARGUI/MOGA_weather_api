const express = require('express')
const app = express()
const messagesRouter = require('./routes/metars')
const usersRouter = require('./routes/users')
const env = require('dotenv').config()

const mongoose = require('mongoose')

mongoose
  .connect(process.env.dbURL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))
app.use(express.json())

//managing routes

app.use('/messages', messagesRouter)
app.use('/users', usersRouter)

app.listen(3000, console.log('server started'))
