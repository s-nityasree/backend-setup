const jwt = require("jsonwebtoken")
function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTc4NDcxMTkxNiwiZXhwIjoxNzg1MzE2NzE2fQ.xwdCluh1zPYg63mMByHmu1vawuw-pdn0bD29ztR9ifI
    console.log("authHeader",authHeader)

    if(!authHeader){//if token is sent
        return res.status(401).json({
            message:"token is missing"
        })
    }

    try{
        const token = authHeader.split(" ")[1]
        console.log("token",token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded",decoded)

        req.user=decoded;
        next();
    }
    catch(error){
        res.status(401).json({
            message:"invalid token"
        })
    }
   

    
}

module.exports = authMiddleware;