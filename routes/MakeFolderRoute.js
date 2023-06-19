const express = require("express")
const router = express.Router();
const auth = require("../meddlewares/auth");
const {makeFolder} = require('../controller/MakeFolderController')

router.post('/:makeFolder' , auth , makeFolder)


module.exports  = router