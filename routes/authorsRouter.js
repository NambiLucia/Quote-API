const express = require("express");
//const path = require("path");
//deal with quote requests
const authorsRouter = express.Router();
const authorController = require("../controllers/authorController");

//quote get requests
authorsRouter.get("/", authorController.getAuthors);
authorsRouter.get("/:id", authorController.getAuthorsById);
authorsRouter.post("/", authorController.createAuthors);
authorsRouter.put("/:id", authorController.updateAuthorsById);
authorsRouter.delete("/:id", authorController.deleteAuthorsById);

module.exports = authorsRouter;
