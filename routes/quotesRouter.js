const express = require("express");
const path = require("path");
//deal with quote requests
const quotesRouter = express.Router();
const quoteController = require("../controllers/quoteController");

//quote get requests
quotesRouter.get("/:id", quoteController.getQuotesById);
quotesRouter.get("/", quoteController.getQuotes);


quotesRouter.post("/", quoteController.createQuotes);
quotesRouter.put("/:id", quoteController.updateQuotesById);
quotesRouter.put("/:id", quoteController.deleteQuotesById);


module.exports = quotesRouter;
