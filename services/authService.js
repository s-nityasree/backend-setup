const jwt = require("jsonwebtoken")
function loginService(username,password){//admin,1234

    //nityasree -- 1234 

    const user={
        username:"admin",
        password:"1234"
    };

    if(username === user.username && password === user.password){
        const token = jwt.sign({
            id:1,
            username:"admin"
        },
        process.env.JWT_SECRET,
        {expiresIn : "7d"}
    );
    return {
        success:true,
        token//"this is secret token"
    };
    }
    return {
        sucess:false,
        message:"invaild username or password"
    };
}

module.exports= {
    loginService
}