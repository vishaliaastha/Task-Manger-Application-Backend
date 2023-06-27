const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    filename : { type : String},
    path : { type :String},
    fullPath : {type : String}

} , {timestamps : true})


module.exports = mongoose.model('upload' , folderSchema)