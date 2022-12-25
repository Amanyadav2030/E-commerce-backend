const mongoose = require('mongoose');
const soldSchema = mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    cartId:{ type: mongoose.Schema.Types.ObjectId, ref: 'cart' },
    checkoutId:{ type: mongoose.Schema.Types.ObjectId, ref: 'checkout' },
    productId:{ type: mongoose.Schema.Types.ObjectId, ref: 'product' },
},{
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })
const SoldModel = mongoose.model('sold',soldSchema);
module.exports = SoldModel;