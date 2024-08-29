const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');
require('dotenv/config');
const bcrpyt = require('bcrypt');




const getUsers = async (req, res) => {
  try {
    let users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const loginUsers = async (req, res) => {
    try {
        const {username,password}=req.body;
//hashed password
      //const hashedPassword =await bcrpyt.hash(password,10)

      let user = await prisma.user.findUnique({
        where:{
            username
        }
      });
        if(user){

          //compare password typed with  hashed password in the DB 
       
            if(user.password === password){
                //create token(jwt)
             const token = await jwt.sign(
                    {id:user.id,role:user.role},
                    process.env.SECRET_KEY,
                    {expiresIn:"1h"}
                )


                //send token back as response

                res.status(StatusCodes.OK).json({token,"message":"Successful login"})
            }
            else{
                res.status(StatusCodes.UNAUTHORIZED).json({"error":"Wrong password"});
            }
             res.status(StatusCodes.NOT_FOUND).json({user});
        }else{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error":"User not found"});
        }



     
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };









module.exports = {
    getUsers,
    loginUsers
    
  };