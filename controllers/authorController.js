const fs = require("node:fs");
const path = require("path");
const filePath = path.resolve(__dirname, "../Models/authors.json");

const getAuthors = (req, res) => {
  const authors = JSON.parse(fs.readFileSync(filePath));// read file
  res.json(authors);
};


const getAuthorsById = (req, res) => {
  const authors = JSON.parse(fs.readFileSync(filePath));
  const author = authors.find(a => a.id === parseInt(req.params.id));//where authorid equals the id specified
  if (author) {
      res.json(author);
  } else {
      res.status(404).json({ message: "Author not found" });
  }
};

const createAuthors = (req, res) => {
  const authors = JSON.parse(fs.readFileSync(filePath));// readfile
  const newAuthor = { id: Date.now(), ...req.body }; //create new author
  authors.push(newAuthor);//add it to array
  fs.writeFileSync(filePath, JSON.stringify(authors)); //save it
  res.status(201).json(newAuthor);
};

const updateAuthorsById = (req, res) => {
  const authors = JSON.parse(fs.readFileSync(filePath));
  const index = authors.findIndex(a => a.id === parseInt(req.params.id));
  if (index !== -1) {
      authors[index] = { id: authors[index].id, ...req.body }; //add request body to the quote with the index
      fs.writeFileSync(filePath, JSON.stringify(authors));
      res.json(authors[index]);
  } else {
      res.status(404).json({ message: "Author not found" });
  }
};

const deleteAuthorsById = (req, res) => {
  const authors = JSON.parse(fs.readFileSync(filePath));
  const filteredAuthors = authors.filter(a => a.id !== parseInt(req.params.id));//filter out those not deleted
  //save
  fs.writeFileSync(filePath, JSON.stringify(filteredAuthors));
  res.status(204).send();
};




module.exports = {
  createAuthors,
  getAuthors,
  getAuthorsById,
  updateAuthorsById,
  deleteAuthorsById,
};