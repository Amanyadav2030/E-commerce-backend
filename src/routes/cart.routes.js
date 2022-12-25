const express = require('express');
const Authmiddleware = require('../middlewares/Authmiddleware');
const CartRouter = express.Router();
const jwt = require('jsonwebtoken');
const {CartModel,ProductModel} = require('../models');
CartRouter.get('/',Authmiddleware,async(req,res)=>{
    try {
        const token = req.headers['authorization'];
        const {id} = jwt.verify(token,process.env.MAIN_TOKEN); 
        const cartItem = await CartModel.find({userId:id,sold:false}).populate([
            "productId"
          ])
        res.send(cartItem);
    } catch (error) {
        res.status(501).send(error.message)
    }
})
CartRouter.get('/:pid',Authmiddleware,async(req,res)=>{
    try {
        const {pid} = req.params;
        const token = req.headers['authorization'];
        const {id} = jwt.verify(token,process.env.MAIN_TOKEN); 
        const cartItem = await CartModel.find({userId:id,sold:false,productId:pid}).populate([
            "productId"
          ])
        res.send(cartItem);
    } catch (error) {
        res.status(501).send(error.message)
    }
})
CartRouter.post('/',Authmiddleware,async(req,res)=>{
    try {
        const {productId,quantity=1} = req.body;
        const token = req.headers['authorization'];
        const verification = jwt.verify(token,process.env.MAIN_TOKEN);
        const userId = verification.id;
        let product = await ProductModel.findById(productId);
        if (product.stock < quantity) {
            return res.send(
            "requested quantity can not more than present products quantity"
            );
        }
      let total=0;
      let existing = await CartModel.findOne({ productId,userId,sold:false });
      if (existing) {
            if(existing.quantity==1 && quantity<1){
                return res.status(409).send("Quantity can't be less than 1");
            }
        total = (existing.quantity+quantity)*product.disPrice;
        console.log(quantity,existing.quantity);
        let updateCart = await CartModel.findOneAndUpdate(
          { productId,userId,sold:false },
          { $set: { quantity: existing.quantity + quantity,total} },
          { new: true }
        );
        res.send(updateCart);
      } else {
        total = product.disPrice*quantity;
        let newCart = await CartModel.create({userId,productId,quantity,total});
        res.send(newCart)
      }

    } catch (error) {
        res.status(501).send(error.message);
    }
}) 
CartRouter.delete('/:id',Authmiddleware,async(req,res)=>{
    const {id} = req.params;
    try {
        const cartItem = await CartModel.findByIdAndDelete(id);
        res.send({
            cartItem,
            msg:"Successully deleted"
        });
    } catch (error) {
        res.status(501).send(error.message)
    }
})
module.exports = CartRouter;