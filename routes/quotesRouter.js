const express=require("express");
const path = require("path");
const fs = require("node:fs");
const filePath = path.join(__dirname, "../Models/quotes.json");
//deal with quote requests
const quotesRouter=express.Router();

//quote get requests
quotesRouter.get("/",(req, res) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).send("Failed to get the Data");
      }
      res.send(data);
    });
  })

  quotesRouter.post("/",(req, res) => {
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
  })

module.exports=quotesRouter;