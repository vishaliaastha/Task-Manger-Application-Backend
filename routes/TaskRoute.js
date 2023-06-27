const express = require("express")
const router = express.Router();
const { createTask ,getTask, deleteTask, updateTask, getTaskByStatus,limitAPICalls} = require('../controller/taskController');
const auth = require("../meddlewares/auth");
// const { rateLimit } = require("express-rate-limit");
// const tasklimiter = require("../meddlewares/rateLimit")

router.get('/' ,auth, getTask)
router.post('/update',auth, limitAPICalls,createTask)
router.delete('/:id',auth,deleteTask)
router.put("/:id",auth,updateTask)
router.get('/getTaskByStatus' ,auth, getTaskByStatus)

module.exports = router
