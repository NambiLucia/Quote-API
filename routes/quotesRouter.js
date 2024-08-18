const express = require("express");
//deal with quote requests
const quotesRouter = express.Router();
const quoteController = require("../controllers/quoteController");

//quote requests
quotesRouter.get("/", quoteController.getQuotes);
quotesRouter.get("/:id", quoteController.getQuotesById);
quotesRouter.post("/", quoteController.createQuotes);
quotesRouter.put("/:id", quoteController.updateQuotesById);
quotesRouter.delete("/:id", quoteController.deleteQuotesById);


module.exports = quotesRouter;
