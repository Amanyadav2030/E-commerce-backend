const express = require('express');
const ProductRouter = express.Router();
const {ProductModel} = require('../models');
ProductRouter.get('/',async(req,res)=>{
    const {order='asc',filter} = req.query;
    try {
        let products = await ProductModel.find().sort({['disPrice']:order==="asc"?1:-1});
        if(filter!="NA"){
            console.log("filter",filter)
            products = products.filter((el)=>el.category===filter);
        }
        res.send(products);
    } catch (error) {
        res.status(501).send(error.message)
    }
})
ProductRouter.get('/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        let product = await ProductModel.findById(id);
        res.send(product);
    } catch (error) {
        res.status(501).send(error.message)
    }
})
ProductRouter.post('/',async(req,res)=>{
    try {
        const product = new ProductModel(req.body);
        await product.save();
        res.send(product);
    } catch (error) {
        res.status(501).send(error.message);
    }
})
module.exports = ProductRouter;