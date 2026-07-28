const db = require('../config/db')

async function getAllUsers(){
    const [rows] = await db.query("SELECT * FROM users");

    return rows;
}

async function createUser(userData){
    const {name,email,password,role} = userData;//name:"john  , email": john@gmail.com "password" : "1234" role:"student"

    const query = `INSERT INTO users(name,email,password,role)
    VALUES(?,?,?,?)`;

    const [result] =  await db.query(query,[//`insert into users(name,email,password,role) values ("john"john@gmail"123""student""")
        name,
        email,
        password,
        role
    ]);

    return{
        id:result.insertId,
        name,
        email,
        role
    }
}

async function getUserById(id) { //2   
    const query = `
    SELECT id,name,email,role
    FROM users
    WHERE id = ?`;
    
    const [rows] = await db.query(query,[id]);//2

    return rows[0];
    
}

async function updateUser(id, userData){
    const {name, email, password, role} = userData;

    const query= `
    UPDATE users
    SET
    name = ?,
    email = ?,
    password = ?,
    role=?
    WHERE id=?`;

    const [result] = await db.query(query,[
        name,
        email,
        password,
        role,
        id
    ]);

    if(result.affectedRows===0){
        return null;
    }

    return{
        id,
        name,
        email,
        role
    }
}

async function deleteUser(id){
    const query = `DELETE FROM users
    WHERE id=?`;

    const [result]= await db.query(query,[id]);

    if(result.affectedRows===0){
        return false;
    }

    return true;
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}