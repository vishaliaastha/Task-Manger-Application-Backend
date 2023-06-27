const { token } = require('morgan');
const TaskModel = require('../model/TaskModel')
const jwt = require('jsonwebtoken');
const {ObjectId } = require('mongodb');
const SECRET_KEY = 'Node_API'
const User = require("../model/UserModel")
const moment = require('moment');


const getTaskByStatus = async (req, res) => {
    // const user = req.query.user;
    
    try {
     
      const counts = await TaskModel.aggregate([
        // { $match: { user: ObjectId(user) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]);
  
      const result = {};
      counts.forEach((item) => {
        result[item._id] = item.count;
      });
      res.json(result);
    } catch (error) {
      console.error('Error retrieving task counts:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


const getTask = async (req,res) => {
    try {

        const task = await TaskModel.find({ user: req.user});
        res.status(200).json(task);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }
}

const createTask = async (req, res) => {
    // console.log(req.user)
    const { title, desc, status , duration,startOn } = req.body;
   

    const CreateNewTask = await TaskModel.create({
        title: title,
        desc: desc,
        status: status,
        duration : duration,
        startOn: startOn, 
        user: req.user,
        categoryId : req.body.categoryId
    })

    try {
      
     

        await CreateNewTask.save();
        res.status(201).json(CreateNewTask);


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong " });


    }

}

var timeLimiter = {};
const limitAPICalls = async(req, res, next) => {
  // const id = req.headers.authorization
  const user = req.user
  const userId = TaskModel.findOne({user : user})
  // const user =await User.findOne({id : req._id})
  // const user = await User.findOne({ user : req._id})
  // const userId = req.user
  // const userId = user
  
  var date = new Date();
  var currentMinute =  date.getMinutes();

  // const currentMinute = moment().startOf('minute').valueOf();

  if (!timeLimiter[userId] || timeLimiter[userId].timestamp !== currentMinute) {

    timeLimiter[userId] = {
      count: 1,
      timestamp: currentMinute
    };
  } else {
   
    if (timeLimiter[userId].count >= 10) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }
    timeLimiter[userId].count++;
  }

  console.log(timeLimiter)
  
  next();
}


const updateTask = async (req , res) => {
    const {id:taskID} = req.params
    const task = await TaskModel.findOneAndUpdate({_id:taskID},req.body , {
     new : true,
     runValidators:true
    })
     res.json({task})
}

const deleteTask = async (req ,res) => {
    const {id:taskID} = req.params
    const task = await TaskModel.findOneAndDelete({_id:taskID})
 
     res.json({task})
}




module.exports = {createTask ,limitAPICalls, updateTask , deleteTask , getTask ,getTaskByStatus };
