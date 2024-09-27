const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
require('dotenv/config');


const validateToken =(req,res,next)=>{
    //check request headers for the token
    const authHeader =req.headers.authorization
    //get token and validate using jwt
    //if token invalid,send to users
    if(authHeader){
        let token =authHeader.split(" ")[1]
        console.log(token);
        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err) {
                console.log(err.message);
                return res.json(err);
            }
            else{
                console.log("Token verified successfully.", user);
            next();

                
            }
        })

    }
    else{
        res.status(StatusCodes.NOT_FOUND).json("Auth header is missing")
    }
    //else move to next() function in route handler
}
module.exports = validateToken;
