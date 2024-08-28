const express = require("express");
const usersRouter = express.Router();
const {getUsers,loginUsers} = require("../controllers/userContoller");





//user requests
usersRouter.get("/",getUsers);

usersRouter.post("/login",loginUsers);



module.exports = usersRouter;