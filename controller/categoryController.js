const categories = require("../model/CategoryModel");
const TaskModel = require('../model/TaskModel')


const createCategory = async (req ,res)=>{
    const { name } = req.body;

  
        const taskCategory = new categories({
            name : name ,
            user : req.user ,

        })
        await taskCategory.save()
        res.status(201).json({taskCategory});
   

    // const taskCategory = await categories.create(req.body)
 
    
}

const getTaskByCategory =  async (req, res) => {
    // const user = req.params.user;
    try {
      const taskCountByCategory = await TaskModel.aggregate([
        // { $match: { user: user } },
        { $group: { _id: '$categoryId', TaskCount: { $sum: 1 } } },
      ]);
  
      res.json(taskCountByCategory);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving task counts.' });
    }
  };


const getCategory = async (req , res) => {
    const relIdsCat = await categories.find({categoryId : req.categoryId})
    res.status(200).json(relIdsCat);

}



module.exports = {createCategory , getCategory , getTaskByCategory};
