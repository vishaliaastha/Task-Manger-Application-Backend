const express = require("express")
const app = express()
const connectDB = require("./db/dbconnect");
const cors = require("cors")

const categoryRoutes = require('./routes/CategoryRoute')
const taskRoutes = require("./routes/TaskRoute")
const userRoutes = require("./routes/userRoute");
// const SubCategory = require("./routes/SubCategoryRoutes");


app.use(cors())

app.use(express.json())


app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);
app.use('/category',categoryRoutes);
// app.use("/subCategory" ,SubCategory)
connectDB()
app.listen(3000)

