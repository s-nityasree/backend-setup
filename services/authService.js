const db = require('../config/db')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
async function register(userData){
    const {name , email, password, role}= userData;

    const [existingUser]= await db.query(//niya@gmail.com
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    if(existingUser.length>0){
        throw new Error("Email already exists! please login")
    }

    const hashedPassword = await bcrypt.hash(password, 10)//12345--> knyutfrdhtwtrstcdryfg 

    const query = `
    INSERT INTO users(name,email,password,role)
    VALUES(?,?,?,?)`;

    const [result] = await db.query(query,[
        name,
        email,
        hashedPassword,
        role
    ]);

    return{
        id:result.insertId,
        name,
        email,
        role
    }
}

async function login(loginData){
    const {email, password} = loginData;
    //vikram@gmail
    const [rows] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );
    if(rows.length ===0){
        throw new Error("invaild email or password");
    }

    const user = rows[0]//ajay@gmail.com eaxrstdyugbiokbvjchg

    const isMatch = await bcrypt.compare(password, user.password)//bob bob

    if(!isMatch){
        throw new Error("invaild email or password")
    }

    const token = jwt.sign({
        id: user.id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "8d"
    }
);

return{
    token,
    user:{
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role
    }
};

}

module.exports= {
    register,
    login
}