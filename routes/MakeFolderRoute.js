const express = require("express")
const router = express.Router();
const auth = require("../meddlewares/auth");
const {makeFolder , makeSubFolder} = require('../controller/MakeFolderController')

router.post('/' , auth , makeFolder)
router.post('/subFolder' , auth , makeSubFolder)



module.exports  = router