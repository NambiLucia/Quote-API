const fs = require("node:fs");
const path = require("path");
const filePath = path.join(__dirname, "../Models/quotes.json");



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

  const updateQuotes=(req,res)=>{
    fs.readFile(filePath,"utf8",(err,data) =>{
      if(err){

        return res.status(500).send("Failed to Update the Data");
      }
      let quotes =JSON.parse(data);//parse JSON data into an array
      let quoteId=req.params["id"]; //get quote ID from req parameters
      let theUpdatedQuote=req.body;//get updated quote from req body
     
    })

    if (quoteId >= 0&& quoteId < quotes.length) {
      quotes[quoteId] = theUpdatedQuote; // Update the specific quote

    fs.writeFile(JSON.stringify(quotes,null,2),(err)=>{
      if(err){
        res.send(`Quote ID:${quoteId} Updated Successfully`)
      }
      res.status(200).send(`Quote ID:${quoteId} NOT updated`)
    });


  } }

  module.exports={
    createQuotes,
    getQuotes,
    updateQuotes
  }