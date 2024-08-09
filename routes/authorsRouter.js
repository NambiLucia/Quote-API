const express = require("express");
const path = require("path");
//deal with quote requests
const authorsRouter = express.Router();
const authorController = require("../controllers/authorController");

//quote get requests
authorsRouter.get("/:id", authorController.getAuthorsById);
authorsRouter.get("/", authorController.getAuthors);


authorsRouter.post("/", authorController.createAuthors);
authorsRouter.put("/:id", authorController.updateAuthorsById);
authorsRouter.put("/:id", authorController.deleteAuthorsById);


module.exports = authorsRouter;
