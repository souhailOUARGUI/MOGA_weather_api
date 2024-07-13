const express = require('express');
const app = express();
const env = require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.dbURL).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(3000, console.log('server started'));