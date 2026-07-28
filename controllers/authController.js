const authService = require('../services/authService')
async function register(req,res){
    try{
        const user = await authService.register(req.body);
        res.status(210).json({
            success:true,
            message:"user registered successfully",
            data:user
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function login(req,res){
    try{
        const user = await authService.login(req.body);//bob@gmail.com bob

        if(!user){
            return res.status(401).json({
                success: false,
                message:"invaild email or password"
            })
        }
        res.status(200).json({
            success:true,
            message:"login succesfull",
            data:user
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {register,
    login
}