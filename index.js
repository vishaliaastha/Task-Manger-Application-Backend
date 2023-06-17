const express = require("express")
const app = express()
const connectDB = require("./db/dbconnect");
const cors = require("cors")

const categoryRoutes = require('./routes/CategoryRoute')
const taskRoutes = require("./routes/TaskRoute")
const userRoutes = require("./routes/userRoute");
// const SubCategory = require("./routes/SubCategoryRoutes");

// File Upload Uing Multer 
const multer  = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : function(req,res , cb){
            cb(null ,'uploads' )
    },
    filename:function(req,file,cb){
        const name = Date.now() + file.originalname
        cb(null,name)
    }
})

const upload = multer({ storage :storage }).array("fileName" ,12)
app.post('/upload' , upload , (req ,res ) => {
   res.send("File is Uploaded")
})

app.use(cors())

app.use(express.json())


app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);
app.use('/category',categoryRoutes);
// app.use("/subCategory" ,SubCategory)
connectDB()
app.listen(3000)

