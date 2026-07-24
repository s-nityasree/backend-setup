const express = require('express')
const students = require('../students')
const router  = express.Router();
const studentController = require('../controllers/studentController')
const authMiddleware = require("../middleware/authMiddleware")


router.get('/', authMiddleware,studentController.getAllStudents);// function needs to be execute 

router.get('/query',authMiddleware,studentController.getStudentsByQuery)

router.post('/',authMiddleware,studentController.addStudent)//

router.get('/:id',authMiddleware, studentController.getStudentById)

router.put('/:id',authMiddleware,studentController.updateStudent)

router.delete('/:id',authMiddleware, studentController.deleteStudent)

//i want to get the students whose course filter students by course

module.exports = router;