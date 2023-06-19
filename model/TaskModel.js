const mongoose = require("mongoose")
const { Schema }  = mongoose

const taskSchema =new Schema({
    title : { type : String , required : true},
    status : { type : String , required : true} ,
    desc : {type : String , required : true},
    duration : {type : Number ,required : true},
    startOn: { type: Date, default: Date.now },
    user : {
        type : Schema.Types.ObjectId , 
        ref : 'User',
        required : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,   
    }

},{timestamps : true});

module.exports = mongoose.model("Task" , taskSchema)