const express = require("express")
const router = express.Router();
const { createTask ,getTask, deleteTask, updateTask, getTaskByStatus} = require('../controller/taskController');
const auth = require("../meddlewares/auth");

router.get('/' ,auth, getTask)
router.post('/update' ,auth, createTask)
router.delete('/:id',auth,deleteTask)
router.put("/:id",auth,updateTask)
router.get('/getTaskByStatus' ,auth, getTaskByStatus)

module.exports = router
