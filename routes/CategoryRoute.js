const express = require("express");
const {createCategory , getCategory} = require("../controller/categoryController");
const auth = require("../meddlewares/auth");
const Categoryrouter = express.Router()

Categoryrouter.post("/",auth,createCategory)
Categoryrouter.get("/:id" , auth ,getCategory)
module.exports = Categoryrouter