const express = require('express')
const cors = require('cors');
const env = require('dotenv').config()
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


const render_url = `https://moga-weather-api.onrender.com`; //Render URL
const render_interval = 60000; // Interval in milliseconds (60 seconds)


const app = express()
const port = 3000;

app.use(bodyParser.json());

//********** DB connection ************/
mongoose
  .connect(process.env.dbURL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))


app.use(express.json())
app.use(cors())
  
const server = app.listen(port, () =>
 {console.log(`server started, listening to port ${port}`);
  setInterval(reloadWebsite,render_interval);
 }
)

// socket handler
const socketHandler = socketIO(server)

socketHandler.on('connection', (socket) => {
  // console.log('client connected')
  socket.on('sendMessage', (msg) => {
    // console.log(msg)
    socket.broadcast.emit('mobile', msg)
    // socket.emit('sendMessage', 'hello testing event')
  })
  socket.on('disconnect', () => {
    // console.log('client disconnected')
  })
})

//********** routes managment ************/

const messagesRouter = require('./routes/metars')(socketHandler)
const usersRouter = require('./routes/users')

app.use('/messages', messagesRouter)
app.use('/users', usersRouter)


//Reloader Function
function reloadWebsite() {
  axios.get(render_url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}