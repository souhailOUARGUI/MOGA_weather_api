const User = require('../models/user')
const bcrypt = require('bcrypt');

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

//login 
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email})
    if (!user) {
      return res.status(404).json({ message: 'cannot find user' })
    }
    const match =  await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful', userData : user });
    return user;
  } catch (error) {
    return res.status(500).json({ message: "user not found", error : error.message })
  }
}

//sign up 
const registerUser = async (req, res) => {
  const { email, password, name,role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully', userData : newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};




//creating a user
const createUser = (req, res) => {
  const user = new User({
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
    password: req.body.password,

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
  res.user.email = req.body.email
  res.user.password = req.body.password
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
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  getUser,
}
