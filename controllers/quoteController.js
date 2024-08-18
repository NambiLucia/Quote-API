const fs = require("node:fs");
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const filePath = path.join(__dirname, "../models/quotes.json");
const prisma = new PrismaClient();


const getQuotes = async(req, res) => {
let quotes=await prisma.quote.findMany()
res.json(quotes)
  
};

const getQuotesById = async (req, res) => {
  const getquotes = await prisma.quote.findUnique({
    where:{
      id:2
    },
   
  })
  res.json(getquotes)
  
};

const createQuotes = async (req, res) => {

 
    const { text,category,author } = req.body; 

    const newquote = await prisma.quote.create({
      data: {
        text,
        category,
        author
      },
    });

    res.status(201).json(newquote);
  }
 


const updateQuotesById = (req, res) => {
  const quotes = JSON.parse(fs.readFileSync(filePath));
  const index = quotes.findIndex(q => q.id === parseInt(req.params.id));
  //checks if quote isnt -1 which makes it valid
  if (index !== -1) {
      quotes[index] = { id: quotes[index].id, ...req.body }; //add request body to the quote with the index,keep original ID
      fs.writeFileSync(filePath, JSON.stringify(quotes));
      res.json(quotes[index]);
  } else {
      res.status(404).json({ message: "Quote not found" });
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
