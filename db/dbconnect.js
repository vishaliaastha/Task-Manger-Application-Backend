const  mongoose  = require('mongoose');


const server = '127.0.0.1:27017'
const database = 'TaskManager'

const connectDB= async() => {
    try {
        await mongoose.connect(`mongodb://${server}/${database}`)
        console.log("Data Base Connected")
    }catch(err){
        console.log("failed Connection " ,err)
    }
}

module.exports = connectDB
