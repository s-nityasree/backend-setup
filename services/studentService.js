const students = require('../students')

const getAllStudents = ()=>{
    return students;//code 
}

const addStudent = (student)=>{
    students.push(student);
    return student;
}

const getStudentById = (id)=>{//3
    return students.find(student=>student.id === id)//1== 2= 3==3
}

const updateStudent = (id, updatedStudent)=>{//5 , updatedStudent = {id = 5, name:"sam", age:54}
    const index = students.findIndex(student=>student.id === id);//1,2,3,4,5 index= 4

    if(index===-1){
        return null
    }
    students[index] = updatedStudent;//students[4]= updatedStudent
    return students[index];//student[4]

}

const deleteStudent = (id)=>{//5
    const index = students.findIndex(student=>student.id===id)//5
    console.log(index)

    if(index===-1){
        return false;
    }
    const deletedStudent = students[index];
    console.log(deletedStudent)
    students.splice(index,1);

    return deletedStudent;
}

const getStudentsByQuery =(course)=>{//query
    if(course){//false//undefined
        return students.filter(student=>student.course === course)
    }
    return students;
}

module.exports = {
    getAllStudents,
    addStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    getStudentsByQuery
}