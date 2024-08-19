const fs = require("node:fs");
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const { error } = require("node:console");
const filePath = path.join(__dirname, "../models/quotes.json");
const prisma = new PrismaClient();


const getQuotes = async(req, res) => {
let quotes=await prisma.quote.findMany()
res.json(quotes)
  
};

const getQuotesById = async (req, res) => {

  try{
    const authorId=parseInt(req.params.id);
  const getquotes = await prisma.quote.findUnique({
    where:{
      id: authorId,
    },
   
  })
  res.status(200).json({getquotes})

  }
catch(error){
  console.log(error)
}    
};



const createQuotes = async (req, res) => {
  

try{

   const {text,category,author} = req.body;
   //const authorInt=parseInt(authorId)

   if (!text || !category || !author ) {
    return res.status(400).json({ error: 'All fields are required and authorId must be a number.' });
  }

    const newquote = await prisma.quote.create({
      data: {
      text,
      category,
      author:{
        create:{
          name:author,
          
        }
      },
 
      },
    });
     return res.status(201).json({ data: newquote });
  } catch (error) {
    console.error(error); 
   
  }

};



const updateQuotesById = async (req, res) => {
  try{
    const updatedQuote = await prisma.quote.update({
      where:{
        id:parseInt(req.params.id)
      },
      data:req.body,

  });
  if(!updatedQuote) {
    return res.status(404).json({error:"Quote not found"})
  }
  res.json(updatedQuote)
  }
  catch(error){
    console.error(error);  

  }
};




const deleteQuotesById = (req, res) => {
  const quotes = JSON.parse(fs.readFileSync(filePath));
  const filteredQuotes = quotes.filter(q => q.id !== parseInt(req.params.id));//filter out those not deleted
  //save
  fs.writeFileSync(filePath, JSON.stringify(filteredQuotes));
  res.status(204).send("Deletion successful");
};


module.exports = {
  getQuotes,
   getQuotesById,
  createQuotes,
  updateQuotesById,
  deleteQuotesById
};
