const express = require('express')
const cors = require('cors')
const dbConnect = require('./config/db')
const {ProductRouter,UserRouter,CartRouter,CheckoutRouter} = require('./routes/index.js');
const app = express()
require('dotenv').config();
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.use('/product',ProductRouter);
app.use('/user',UserRouter);
app.use('/cart',CartRouter);
app.use('/checkout',CheckoutRouter);
app.get('/', (req, res) => res.send('hello'))

dbConnect().then(()=>{  
    app.listen(8080, () => {console.log('server started on port 8080')})
})