const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    quantity:{type:Number,required:true,default:1},
    userId:{ required:true, type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    productId:{required:true, type: mongoose.Schema.Types.ObjectId, ref: 'product' },
    total:{type:Number,required:true},
    sold:{type:Boolean,default:false}
},{
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })
const CartModel = mongoose.model('cart',cartSchema);
module.exports = CartModel;