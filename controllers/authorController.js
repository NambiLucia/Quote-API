
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();

const getAuthors = async(req, res) => {
  try{
    let authors=await prisma.author.findMany({
      include:{
        quotes:true
      }
  })
  res.json(authors)
     
  }
  catch(error){
    console.error(error);

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
  res.status(200).json({getauthor})

  }
catch(error){
  console.error(error)
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

    return res.status(201).json({ data: newauthor });

  }
  catch(error){
    console.error(error)
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
res.status(200).json({data:"Author updated",updatedauthor})
  }
  catch (error){
    console.error(error);  

  }


};

const deleteAuthorsById = async(req, res) => {
 try{
const deletedauthor =await prisma.author.delete({
  where:{
    id:parseInt(req.params.id)
  }
})
res.status(200).json({message:"Author deleted",deletedauthor})
 }
 catch(error){
  console.log(error);
  return res.status(500).json({error: "Internal Server Error"})
 }
  
};




module.exports = {
  createAuthors,
  getAuthors,
  getAuthorsById,
  updateAuthorsById,
  deleteAuthorsById,
};