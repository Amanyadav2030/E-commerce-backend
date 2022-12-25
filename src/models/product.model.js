const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    Img:{type:String,required:true},
    Hover:{type:String,required:true},
    category:{type:String,required:true},
    brand:{type:String,required:true},
    disPrice:{type:Number,required:true},
    realPrice:{type:Number,required:true},
    rating:{type:Number,required:true},
    title:{type:String,required:true},
    stock:{type:Number,required:true, default:1},
    status:{type:Boolean,required:true,default:false},
},{
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })
const ProductModel = mongoose.model('product',productSchema);
module.exports = ProductModel;

// {
//     "Image": "https://cdn.shopify.com/s/files/1/0054/6665/2718/products/C-GlowOil-FreeFaceGel-01_900x.jpg?v=1652176030",
//     "Hover":"https://cdn.shopify.com/s/files/1/0054/6665/2718/products/C-GlowOil-FreeFaceGel-03_360x.jpg?v=1655309436",
//     "category": "skin",
//     "brand": "C-Glow Oil-Free Face Gel, 50gm",
//     "disPrice":244,
//     "realPrice":299,
//     "rating":"4.9",
//     "title":"Brightening & Hydrating",
//     "status":false
//   }