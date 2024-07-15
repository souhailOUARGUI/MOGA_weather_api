const User = require('../models/user')

// getting all
const fetchUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// getting one user
const fetchUser = (req, res) => {
  res.json(res.user)
}
const createUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    role: req.body.role,
  })
  try {
    const newUser = user.save()
    res.status(201).json({ message: 'user created' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// updating a user
const updateUser = async (req, res) => {
  res.user.name = req.body.name
  res.user.role = req.body.role
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// deleting user
const deleteUser = async (req, res) => {
  try {
    await res.user.deleteOne().then(() => res.json({ message: 'User Deleted' }))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//one user getter
async function getUser(req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'cannot find user' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.user = user
  next()
}

module.exports = {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
  getUser,
}
