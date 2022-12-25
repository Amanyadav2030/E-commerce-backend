const {UserModel} = require('../models');
const jwt = require('jsonwebtoken'); 
async function Authmiddleware(req,res,next){
    const token = req.headers.authorization;
    if(!token){ 
        return res.status(401).send("Unauthorised")
    };
    try{ 
        const verification = jwt.verify(token,process.env.MAIN_TOKEN);
        const {id} = verification;
        let check = await UserModel.findById(id);
        if(check){
            next();
        }else{
            res.status(401).send("User not authenticated");
        }
    }catch(e){
        console.log(e);
        res.status(501).send(e);
    }
};
module.exports = Authmiddleware;