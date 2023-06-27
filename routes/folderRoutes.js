const express = require("express")
const router = express.Router(); 
const auth = require("../meddlewares/auth");
const {folderCreateApi ,getAllDirectory , getAllFiles} = require("../controller/folderPath")
// const  {upload}  = require('../meddlewares/multerMeddleWare')
const folderModel  = require('../model/folderModel')

router.post('/foldercreate' , auth , folderCreateApi)
router.get('/getalldirectory' , auth , getAllDirectory)
router.get('/getallfiles' , auth , getAllFiles)

// router.post('/uploadfiles', auth , upload().single('myfile') , async(req ,res) => {
// if(req.file){
//     console.log(req.file)
//         // const fullPath = req.query.path 
//         const uploadData = new folderModel({
//             user : req.user,
//             filename : req.file.filename,
//             path : req.query.path
//         })
//         await uploadData.save();

//         return res.status(200).json({uploadData})

//         // return res.status(200).json({msg : "File Uploaded Success Fully"})
//     }
// })

module.exports = router