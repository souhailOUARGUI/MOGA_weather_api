const express = require('express');
const usrRouter = express.Router();
const User = require('../models/user');




// getting all


usrRouter.get('/',async(req,res)=> {
  // res.send('hello world');
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
})



// getting one


usrRouter.get('/:id',getUser,(req,res)=> {
    res.send(res.user)
  }
  );

// creating one


usrRouter.post('/',(req,res)=> {
  // res.send(req.params.id);

  const user = new User({
    name: req.body.name,
    role: req.body.role,
  })
  try {
    const newUser = user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({message: error.message});
  }

})

// updating one



usrRouter.patch('/:id',(req,res)=> {
    
})


// deleting one


usrRouter.delete('/:id',(req,res)=> {
    
})



async function getUser(req,res,next){
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({message: 'cannot find user'});
      
    }
  } catch (error) {
    
    return res.status(500).json({message: error.message});
  }

res.user = user;
next();

}





module.exports = usrRouter;