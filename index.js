const express = require("express")
const app = express()
const connectDB = require("./db/dbconnect");
const cors = require("cors")

const categoryRoutes = require('./routes/CategoryRoute')
const taskRoutes = require("./routes/TaskRoute")
const userRoutes = require("./routes/userRoute")


app.use(cors())

app.use(express.json())


app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);
app.use('/category',categoryRoutes);

connectDB()
app.listen(3000)

