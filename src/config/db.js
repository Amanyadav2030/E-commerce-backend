const mongoose = require('mongoose');
require('dotenv').config();
const dbConnect = ()=>{
    mongoose.set('strictQuery', false);
    return mongoose.connect(process.env.MONGO_API_KEY);
}
module.exports = dbConnect;