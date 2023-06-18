const { token } = require('morgan');
const TaskModel = require('../model/TaskModel')
const jwt = require('jsonwebtoken');
// const {ObjectId } = require('mongodb');




const SECRET_KEY = 'Node_API'
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
    console.log(req.user)
    const { title, desc, status } = req.body;
   

    const CreateNewTask = await TaskModel.create({
        title: title,
        desc: desc,
        status: status,
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




module.exports = {createTask , updateTask , deleteTask , getTask ,getTaskByStatus};
