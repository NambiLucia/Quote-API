const express = require("express");
const fs = require("node:fs");
const path = require("path");
const morgan = require("morgan");
const filePath = path.join(__dirname, "quotes.json");


const app = express();
const PORT = 4800;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>My First Quote API</h1>");
});

app.get("/quotes", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Failed to get the Data");
    }
    res.send(data);
  });
});

app.post("/quotes", (req, res) => {
  const newQuote = req.body; // One created in postman
// read to get existing quotes first
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Failed to get the Data");
    }

    let oldQuotes = JSON.parse(data);

    oldQuotes.push(newQuote);

    //write updated quotes array back to filepath

    fs.writeFile(filePath, JSON.stringify(oldQuotes, null, 2), (err) => {
      if (err) {
        return res.status(500).send("Failed to save new quote");
      }
      res.send("Saved successfully");
    
    });
  });
});





app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
