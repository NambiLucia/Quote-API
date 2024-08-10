const fs = require("node:fs");
const path = require("path");
const filePath = path.join(__dirname, "../Models/quotes.json");

const getQuotes = (req, res) => {
  const quotes = JSON.parse(fs.readFileSync(filePath));// read file
  res.json(quotes);
};

const getQuotesById = (req, res) => {
  const quotes = JSON.parse(fs.readFileSync(filePath));
  const quote = quotes.find(q => q.id === parseInt(req.params.id)); //where quote id equals the id specified
  if (quote) {
      res.json(quote);
  } else {
      res.status(404).json({ message: "Quote not found" });
  }
};

const createQuotes = (req, res) => {
  const quotes = JSON.parse(fs.readFileSync(filePath));// readfile
  const newQuote = { id: Date.now(), ...req.body }; //create new quote
  quotes.push(newQuote);//add it to array
//save it
  fs.writeFileSync(filePath, JSON.stringify(quotes));
  res.status(201).json(newQuote);
};

const updateQuotesById = (req, res) => {
  const quotes = JSON.parse(fs.readFileSync(filePath));
  const index = quotes.findIndex(q => q.id === parseInt(req.params.id));
  if (index !== -1) {
      quotes[index] = { id: quotes[index].id, ...req.body }; //add request body to the quote with the index
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
  createQuotes,
  getQuotes,
  updateQuotesById,
  getQuotesById,
  deleteQuotesById
};
