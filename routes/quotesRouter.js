const express = require("express");
const path = require("path");
const filePath = path.join(__dirname, "../Models/quotes.json");
//deal with quote requests
const quotesRouter = express.Router();
const quoteController = require("../controllers/quoteController");

//quote get requests
//quotesRouter.get("/", quoteController.getQuotes);
quotesRouter.get("/:id", quoteController.getQuotesById);

quotesRouter.post("/", quoteController.createQuotes);
quotesRouter.put("/:id", quoteController.updateQuotesById);


module.exports = quotesRouter;
