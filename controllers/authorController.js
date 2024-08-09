const fs = require("node:fs");
const path = require("path");
const filePath = path.join(__dirname, "../Models/authors.json");

// Helper function to read the authors file
const readAuthorsFile = (callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return callback(err);
    }
    try {
      const authors = JSON.parse(data);
      callback(null, authors);
    } catch (parseErr) {
      callback(parseErr);
    }
  });
};

// Helper function to write to the authors file
const writeAuthorsFile = (authors, callback) => {
  fs.writeFile(filePath, JSON.stringify(authors, null, 2), (err) => {
    callback(err);
  });
};

// Get all authors
const getAuthors = (req, res) => {
  readAuthorsFile((err, authors) => {
    if (err) {
      return res.status(500).send("Failed to retrieve the data");
    }
    res.json(authors);
  });
};

// Get author by ID
const getAuthorsById = (req, res) => {
  const authorId = parseInt(req.params.id);
  readAuthorsFile((err, authors) => {
    if (err) {
      return res.status(500).send("Failed to retrieve the data");
    }

    const author = authors.find((a) => a.id === authorId);

    if (author) {
      return res.json(author);
    } else {
      return res.status(404).send("Author not found");
    }
  });
};

// Create a new author
const createAuthors = (req, res) => {
  const newAuthor = req.body;

  readAuthorsFile((err, authors) => {
    if (err) {
      return res.status(500).send("Failed to retrieve the data");
    }

    authors.push(newAuthor);

    writeAuthorsFile(authors, (err) => {
      if (err) {
        return res.status(500).send("Failed to save new author");
      }
      res.status(201).send("Saved successfully");
    });
  });
};

// Update author by ID
const updateAuthorsById = (req, res) => {
  const authorId = parseInt(req.params.id);
  const updatedAuthor = req.body;

  if (!updatedAuthor || Object.keys(updatedAuthor).length === 0) {
    return res.status(400).send("Request body is missing or empty");
  }

  readAuthorsFile((err, authors) => {
    if (err) {
      return res.status(500).send("Failed to retrieve the data");
    }

    const authorIndex = authors.findIndex((a) => a.id === authorId);
    if (authorIndex === -1) {
      return res.status(404).send("Author not found");
    }

    authors[authorIndex] = updatedAuthor;

    writeAuthorsFile(authors, (err) => {
      if (err) {
        return res.status(500).send(`authorId:${authorId} not updated`);
      }
      res.send(`authorID:${authorId} updated successfully`);
    });
  });
};

// Delete author by ID
const deleteAuthorsById = (req, res) => {
  
  let authors = JSON.parse(data);
  let authorId = parseInt(req.params["id"]);
  const authorToDelete= authors.find(element =>element.id === authorId);
  const index =authors.indexOf(authorToDelete);
  authors.splice(index,1);
  
  s.writeFile(filePath,JSON.stringify(authors, null, 2), (err) => {
    if (err) {
   
     return res.status(404).send(`Author ID:${authorId} NOT updated`);
    }
    
    
  res.status(200).send(`Quote ID:${authorId} Updated Successfully`);

  });
  

};

module.exports = {
  createAuthors,
  getAuthors,
  getAuthorsById,
  updateAuthorsById,
  deleteAuthorsById,
};