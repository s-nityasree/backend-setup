const studentService = require('../services/studentService');
const students = require('../students');

const getAllStudents = (req,res)=>{
    const students = studentService.getAllStudents();//students
    console.log("headers",req.headers)
    console.log("authorization", req.headers.authorization)//1234
    res.status(200).json({message:"students fetched succesfully",students});
}

const addStudent = (req,res)=>{
    const student = studentService.addStudent(req.body)//newStudet
    
    res.status(200).json({message:"student added succesfully", student})
}

const getStudentById = (req,res)=>{
    const id = Number(req.params.id)
    const student= studentService.getStudentById(id);

    if(!student){
        return res.status(404).json({message:"student not found"})
    }

    res.status(200).json({message:"student of id is fetched",student})
}

const updateStudent = (req,res)=>{
    const id = Number(req.params.id);//5

    const student = studentService.updateStudent(id,req.body);//(5,age=54)//students[4]{object}

    if(!student){
        return res.status(404).json({message:"student not found"})
    }

    res.status(200).json({message:"student updated succesfully",student})

}

const deleteStudent = (req,res)=>{
    const id = Number(req.params.id)//5
    const deletedStudent = studentService.deleteStudent(id);

    if(!deletedStudent){
        return res.status(404).json({message:"student not found"})
    }

    res.status(200).json({message:"student deleted succesfully"})
}

const getStudentsByQuery = (req,res)=>{
    const {course} = req.query///students?course=react///python
    const students = studentService.getStudentsByQuery(course)//python

    res.status(200).json({
        message:"filtered students based on request",
        students
    })

}

module.exports= {
    getAllStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentsByQuery
}