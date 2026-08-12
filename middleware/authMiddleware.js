const jwt = require("jsonwebtoken")

function verifyToken(req,res,next){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token, process.env.JWT_SECRET
        );
        req.user = decoded;

        next();
    }
    catch(error){
        res.status(401).json({
            success:false,
            message:"invalid token"
        })
    }
}

module.exports = verifyToken