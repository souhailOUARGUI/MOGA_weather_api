const express = require('express')
const usrRouter = express.Router()
const userController = require('../controllers/userController')

// getting all
usrRouter.get('/', userController.fetchUsers)

// getting one
usrRouter.get('/:id', userController.getUser, userController.fetchUser)

// creating one
usrRouter.post('/', userController.createUser)

// login 
usrRouter.post('/login', userController.loginUser)

// login 
usrRouter.post('/register', userController.registerUser)

// updating one
usrRouter.patch('/:id', userController.getUser, userController.updateUser)

// deleting one
usrRouter.delete('/:id', userController.getUser, userController.deleteUser)

module.exports = usrRouter