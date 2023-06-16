const categories = require("../model/CategoryModel");

const createCategory = async (req ,res)=>{
    const { name } = req.body;

    // const taskCategory = await categories.create(req.body)
    const taskCategory = new categories({
        name : name ,
        user : req.user ,
    })
    await taskCategory.save()
    res.status(201).json({taskCategory});
    
}

const getCategory = async (req , res) => {
    const relIdsCat = await categories.find({categoryId : req.categoryId})
    res.status(200).json(relIdsCat);

}



module.exports = {createCategory , getCategory};