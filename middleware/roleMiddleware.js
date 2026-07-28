function authorizeRoles(...allowedRoles){//ADMIN//student
    return (req,res,next) =>{
        const userRole = req.user.role;//studemt

        if(!allowedRoles.includes(userRole)){//ADMIN.includes(student)
            return res.status(403).json({
                success:false,
                message:"access denied"
            })

        }
        next();//controller
    }
}

module.exports = authorizeRoles;