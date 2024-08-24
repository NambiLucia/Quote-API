
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();
const {StatusCodes} =require("http-status-codes")

const getAuthors = async(req, res) => {
  try{
    let authors=await prisma.author.findMany({
      include:{
        quotes:true
      }
  })
  return res.status(StatusCodes.OK).json(authors)
     
  }
  catch(error){
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({error:error.message});

  }
 
};


const getAuthorsById = async (req, res) => {
  try{
   const id = parseInt(req.params.id)
  const getauthor = await prisma.author.findUnique({
    where:{
      id: id,
    },
    include:{
      quotes:true,
    }
   
  })
 
 
    return res.status(StatusCodes.OK).json({ message: `Author id ${id}`,getauthor})
 


  }
catch(error){
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({error});

}
};



const createAuthors = async(req, res) => {
  try{
    const {name,picture,quotes} = req.body;
    if (!name || !picture || !quotes || !quotes.text || !quotes.category ) {
      return res.status(400).json({ error: "Name, picture, text, and category are all required fields." });
    }

    const newauthor =await prisma.author.create({
      data:{
        name,
        picture,
        quotes:{
          create:{
           text:quotes.text,
           category:quotes.category
          }
        }

      } 

    })

    return res.status(StatusCodes.OK).json({ message:"New Author added",data: newauthor });

  }
  catch(error){
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({error:error.message});
  }
};



const updateAuthorsById = async(req, res) => {
  try{
    const id = parseInt(req.params.id)
    const updatedauthor= await prisma.author.update({
      where:{
        id:id
      },
      data:req.body,
      include:{
        quotes:true,
      }
    })
    return res.status(StatusCodes.OK).json({data:"Author updated",updatedauthor})
  }
  catch (error){
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({error:error.message});

  }
};

const deleteAuthorsById = async(req, res) => {
 try{
const deletedauthor =await prisma.author.delete({
  where:{
    id:parseInt(req.params.id)
  }
})
return res.status(StatusCodes.OK).json({message:"Author deleted",deletedauthor})
 }
 catch(error){
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({error:error.message});
 }
  
};


module.exports = {
  createAuthors,
  getAuthors,
  getAuthorsById,
  updateAuthorsById,
  deleteAuthorsById,
};