const express = require("express");
const path = require("path");
//deal with quote requests
const authorsRouter = express.Router();
const { getAuthors, getAuthorsById, createAuthors, updateAuthorsById, deleteAuthorsById } = require('../controllers/authorController');

//quote get requests
authorsRouter.get("/", getAuthors);
authorsRouter.get("/:id", getAuthorsById);
authorsRouter.post("/", createAuthors);
authorsRouter.put("/:id", updateAuthorsById);
authorsRouter.delete("/:id", deleteAuthorsById);


module.exports = authorsRouter;
