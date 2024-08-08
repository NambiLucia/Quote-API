const fs = require("node:fs");



const getQuotes=(req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Failed to get the Data");
      }
      res.send(data);
    });
  }

  const createQuotes=(req, res) => {
    const newQuote = req.body; // One created in postman
  // read to get existing quotes first
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Failed to get the Data");
      }
  
      let oldQuotes = JSON.parse(data);//to be js obj for manipulation as array
  
      oldQuotes.push(newQuote);
  
      //write updated quotes array back to filepath
  
      fs.writeFile(filePath, JSON.stringify(oldQuotes, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Failed to save new quote");
        }
        res.send("Saved successfully");
      
      });
    });
  }

  module.exports={
    createQuotes,
    getQuotes
  }