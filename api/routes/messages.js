const express = require('express');
const msgRouter = express.Router();

const Message = require('../models/message');




// getting all 
msgRouter.get('/',async(req,res)=> {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        console.log('errorr');
        res.status(400).json({message: error.message})
    }  
})
// getting one 
msgRouter.get('/:id',getMessage,(req,res)=> {
    res.json(res.message);
})
// creating one 
msgRouter.post('/',async (req,res)=> {
    const message =new Message({
        message: req.body.message,
        timestamp: Date.now()
    });
    try {
        const newMessage = await message.save();
        res.json({message: "message created"});
    } catch (error) {
        res.status(400).json({message: error.Message});
    }

})
// updating one 
msgRouter.patch('/:id',getMessage,(req,res)=> {
    
})

// deleting one
msgRouter.delete('/:id',getMessage,(req,res)=> {

})


async function getMessage(req,res,next){
    let message;
    try {
        message = await Message.findById(req.params.id);
        if (message == null) {
            return res.status(404).json({message : "message not found"});
        }
    } catch (error) {
        return res.status(500).json({message : error.message});
    }
    res.message = message;
    }
    

module.exports = msgRouter;