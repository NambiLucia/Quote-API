const express = require("express");
//deal with quote requests
const quotesRouter = express.Router();
const quoteController = require("../controllers/quoteController");

//quote get requests
quotesRouter.get("/", quoteController.getQuotes);
quotesRouter.get("/:id", quoteController.getQuotesById);
quotesRouter.post("/", quoteController.createQuotes);
quotesRouter.put("/:id", quoteController.updateQuotesById);
quotesRouter.put("/:id", quoteController.deleteQuotesById);


module.exports = quotesRouter;
