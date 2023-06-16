const express = require("express")
const router = express.Router();
const { createTask ,getTask, deleteTask, updateTask} = require('../controller/taskController');
const auth = require("../meddlewares/auth");

router.get('/' ,auth, getTask)
router.post('/' ,auth, createTask)
router.delete('/:id',auth,deleteTask)
router.put("/:id",auth,updateTask)
module.exports = router
