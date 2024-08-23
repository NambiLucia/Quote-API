const express = require("express");
//const path = require("path");
//deal with quote requests
const authorsRouter = express.Router();
const authorController = require("../controllers/authorController");
const {authorSchema} =require('../utils/joi-schemas')
const {validateQuote} = require('../utils/joi-quote-validator');

//quote get requests
authorsRouter.get("/", authorController.getAuthors);
authorsRouter.get("/:id", authorController.getAuthorsById);
authorsRouter.post("/", authorController.createAuthors);
authorsRouter.put("/:id",validateQuote(authorSchema), authorController.updateAuthorsById);
authorsRouter.delete("/:id", authorController.deleteAuthorsById);

module.exports = authorsRouter;
