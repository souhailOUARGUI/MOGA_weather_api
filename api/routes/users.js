const express = require('express');
const usrRouter = express.Router();


// getting all


usrRouter.get('/',(req,res)=> {
  res.send('hello world');
    
})



// getting one


usrRouter.get('/:id',(req,res)=> {
    res.send(req.params.id)});

// creating one


usrRouter.post('/:id',(req,res)=> {
  res.send(req.params.id);
})

// updating one



usrRouter.patch('/:id',(req,res)=> {
    
})


// deleting one


usrRouter.delete('/:id',(req,res)=> {
    
})



module.exports = usrRouter;