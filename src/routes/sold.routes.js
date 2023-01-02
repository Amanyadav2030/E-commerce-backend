const express = require('express');
const Authmiddleware = require('../middlewares/Authmiddleware');
const SoldRouter = express.Router();
const {CartModel} = require('../models');
SoldRouter.get('/',Authmiddleware,async(req,res)=>{
    try {
        const orderItems = await CartModel.find({userId:req.user,sold:true}).populate([
            "productId"
          ])
        res.send(orderItems);
    } catch (error) {
        res.status(501).send(error.message)
    }
})
module.exports = SoldRouter;