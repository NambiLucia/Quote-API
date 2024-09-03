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

//user signup
const signUp =async(req,res)=>{
  try{
    const {username,password,email,role} =req.body;
    const hashedPassword =await bcrpyt.hash(password,10)

   const newUser = await prisma.user.create({
    data:{
      username,
      password:hashedPassword,
      email,
      role

    }
    
 
  
    });
    return res.status(StatusCodes.OK).json({"message":"User created successfully", newUser})
  }

  catch(error){
console.log(error)
return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"message":"Error occured while creating user"})

  }
}




const loginUsers = async (req, res) => {
    try {
        const {username,password}=req.body;

      let user = await prisma.user.findUnique({
        where:{
            username
        }
      });
        if(user){
          //compare entered password with hashed password
          const matchPassword = await bcrpyt.compare(password,user.password)
       
            if(matchPassword){
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
             //res.status(StatusCodes.NOT_FOUND).json({user});
        }else{
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({"error":"User not found",user});
        }



     
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

  /*const updateUserById = async (req, res) => {
    try {
      const { password, ...otherData } = req.body;
  
      // First, update the user without hashing the password
      let updatedUser = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: otherData, // Update with other data, excluding the password
      });
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // If a password is provided, hash it and update the user again
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        updatedUser = await prisma.user.update({
          where: {
            id: req.params.id,
          },
          data: {
            password: hashedPassword,
          },
        });
      }
  
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res
        .status(500)
        .json({ error: error.message });
    }
  };*/









module.exports = {
    getUsers,
    loginUsers,
    signUp,
    //updateUserById
    
  };