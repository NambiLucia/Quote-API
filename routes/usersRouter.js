// routes/usersRouter.js
const express = require("express");
const usersRouter = express.Router();
const { getUsers, loginUsers,signUp,updateUserById } = require("../controllers/userController"); // Ensure the path is correct
const validateToken = require("../utils/validateToken"); // Ensure the path is correct

// User requests
// Validate before someone gets users
usersRouter.get("/", validateToken, getUsers);
usersRouter.post("/login", loginUsers);
usersRouter.post("/signup", signUp);
//usersRouter.post("/update/:id", updateUserById);


module.exports = usersRouter; // Export the router directly