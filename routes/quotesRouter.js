const express = require("express");
//deal with quote requests
const quotesRouter = express.Router();
const { getQuotes, getQuotesById, createQuotes, updateQuotesById, deleteQuotesById } = require('../controllers/quoteController');

//quote get requests
quotesRouter.get("/", getQuotes);
quotesRouter.get("/:id", getQuotesById);
quotesRouter.post("/", createQuotes);
quotesRouter.put("/:id", updateQuotesById);
quotesRouter.delete("/:id", deleteQuotesById);


module.exports = quotesRouter;
