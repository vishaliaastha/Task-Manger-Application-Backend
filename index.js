const express = require("express")
const app = express()
const connectDB = require("./db/dbconnect");
const cors = require("cors")

const categoryRoutes = require('./routes/CategoryRoute')
const taskRoutes = require("./routes/TaskRoute")
const userRoutes = require("./routes/userRoute");
const makeFolderRoute = require("./routes/MakeFolderRoute");
const folderModel  = require("./model/folderModel")
// const SubCategory = require("./routes/SubCategoryRoutes");
const TaskModel = require('./model/TaskModel')

// File Upload Uing Multer 
const multer  = require('multer')
const path = require('path')

const fileSystem = require("./routes/folderRoutes");

// Limiter 

const rateLimit = require('express-rate-limit');
const auth = require("./meddlewares/auth");





const storage = multer.diskStorage({
    destination : function(req,res , cb){
            cb(null ,path.join(__dirname,"uploads" ))
    },
    filename:function(req,file,cb){
        const name = file.originalname
        cb(null,name)
    }
})



const upload = multer({ storage :storage })
app.post('/upload' , auth ,upload.single("filename") , async(req ,res ) => {
    const path =new folderModel({
        path : req.query.path ,
        filename : req.file.filename,
        fullPath : req.file.destination
    })

    try{

       await path.save()
        res.status(200).json({path})
    }catch(err){
        res.send(err)
    }

})



// const limiter = rateLimit({
// 	windowMs: 1 * 60 * 1000, 
// 	max: 10,
//      message:
// 		'Too many Task created from this IP, please try again after an 1 minute',
//     keyGenerator: (req) => requser, 
// 	standardHeaders: true, 
// 	legacyHeaders: false
// })

// app.use('/tasks/update', limiter)

app.use(cors())

app.use(express.json())


app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);
app.use('/category',categoryRoutes);
app.use('/folders', makeFolderRoute)
app.use('/' , fileSystem)
// app.use("/subCategory" ,SubCategory)
connectDB()
app.listen(3000)

