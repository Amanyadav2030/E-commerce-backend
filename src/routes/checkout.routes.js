const express = require('express');
const Authmiddleware = require('../middlewares/Authmiddleware');
const CheckoutRouter = express.Router();
const jwt = require('jsonwebtoken');
const {CartModel,CheckoutModel} = require('../models');
CheckoutRouter.get('/',Authmiddleware,async(req,res)=>{
    try {
        const token = req.headers['authorization'];
        const {id} = jwt.verify(token,process.env.MAIN_TOKEN);
        const checkoutItem = await CheckoutModel.find({userId:id}).populate(["cartId"])
        res.send(checkoutItem);
    } catch (error) {
        res.status(501).send(error.message)
    } 
})
CheckoutRouter.post('/',Authmiddleware,async(req,res)=>{
    try {
        const token = req.headers['authorization']; 
        const verification = jwt.verify(token,process.env.MAIN_TOKEN);
        const userId = verification.id;    
        const newCheckout = new CheckoutModel({...req.body,userId});
        await newCheckout.save()
        res.send(newCheckout);
    } catch (error) {
        res.status(501).send(error.message);
    }
})
CheckoutRouter.patch('/:id',Authmiddleware,async(req,res)=>{
    try {
        const {id} = req.params;
        const {cartId} = req.body;
        console.log("hello")
        for(cart of cartId){
            await CartModel.findByIdAndUpdate(cart,{sold:true});
         }
         const updateCheckout = await CheckoutModel.findByIdAndUpdate(id,{status:true});
         res.send(updateCheckout);
    } catch (error) {
        res.status(501).send(error.message);
    }
})
module.exports = CheckoutRouter;