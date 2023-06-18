const express = require("express");
const {createCategory , getCategory ,getTaskByCategory} = require("../controller/categoryController");
const auth = require("../meddlewares/auth");
const Categoryrouter = express.Router()

Categoryrouter.post("/",auth,createCategory)
Categoryrouter.get("/:id" , auth ,getCategory)
Categoryrouter.get('/taskByCategory/counts' , auth , getTaskByCategory)

module.exports = Categoryrouter