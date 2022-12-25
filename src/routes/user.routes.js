const express = require('express');
const UserRouter = express.Router();
const {UserModel} = require('../models');
const jwt = require('jsonwebtoken');
UserRouter.get('/',(req,res)=>res.send("Welcome to user route"));
UserRouter.post('/signup',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
           return  res.status(401).send("User is already signup")
        };
        const newUser =  new UserModel(req.body);
        await newUser.save();
        res.send(newUser);
    }catch(e){
        return res.status(500).send({error:e.message});
    }
})
/*************   LOGIN ROUTE    ********** */
UserRouter.post('/login',async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user =await UserModel.findOne({email,password});
        if(!user){
            return res.status(404).send("Please signup first");
        };
        const token = jwt.sign(
            {id:user._id,email:user.email},
            process.env.MAIN_TOKEN,
            {
                expiresIn:"10 days"
            }
        );
        res.send({token});
    }catch(e){
        console.log(e)
        res.status(501).send(e);
    }
})
UserRouter.get('/info',async(req,res)=>{
    try{
        const token = req.headers['authorization'];
        const verification = jwt.verify(token,process.env.MAIN_TOKEN);
        const id = verification.id;
        const user =await UserModel.find({_id:id},{password:0});
        if(!user){
            return res.status(404).send("Please signup first");
        }; 
        res.send(user[0]);
    }catch(e){
        console.log(e)
        res.status(501).send(e);
    }
})
UserRouter.patch('/update',async(req,res)=>{
    const token = req.headers['authorization'];
    const verification = jwt.verify(token,process.env.MAIN_TOKEN);
    const id = verification.id;
    try{
        const user = await UserModel.findByIdAndUpdate(id,req.body);
        if(!user){
            return res.status(404).send("Please signup first");
        }; 
        res.send(user);
    }catch(e){
        console.log(e)
        res.status(501).send(e);
    }
})

module.exports = UserRouter;