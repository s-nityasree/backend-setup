const {loginService} = require("../services/authService")

function login(req,res){
    const {username, password} = req.body;

    const result = loginService(username,password);//sucess: true, token : edbfhvtrnboienqioe result = {success:true, token:hfbhetkjH}

    if(!result.success){
        return res.status(401).json(result)
    }

    res.status(200).json({
        message:"login succesfful",
        token: result.token
    });//sucess: true, token :"student-secret-token"

}

module.exports = {
    login
}