const mongoose = require('mongoose'); 
const todate = new Date();
let newdate = todate.setDate(todate.getDate() + 3);
const checkoutSchema = mongoose.Schema({
    totalPrice:{type:Number,required:true},
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true },
    cartId:{ type: mongoose.Schema.Types.Mixed, ref: 'cart' ,required:true},
    address: {
        type: String, 
        required: true,
        maxlength: 200,
      },
      status: {
        type: Boolean,
        default: false,
      },
      paymentType: {
        type: String,
        enum: ["cash", "card"],
        default: "card",
      },
      totalQuantity: {
        type: Number,
        required:true
        },
      deliveryDate: {
        type: Date,
        default: new Date(newdate),
      }
},{
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })
const CheckoutModel = mongoose.model('checkout',checkoutSchema);
module.exports = CheckoutModel;