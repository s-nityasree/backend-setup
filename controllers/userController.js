    const userService = require('../services/userService')
    async function getAllUsers(req,res){
        try{
            const users = await userService.getAllUsers();

            res.status(200).json({
                success:true,
                message:"Users fetched succesfully",
                data:users
            });
        }
        catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    async function createUser(req,res){
        try{
            const user = await userService.createUser(req.body);

            res.status(201).json({
                success:true,
                message:"user created succesfully",
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

    async function getUserById(req,res){
        try{
            const {id} = req.params;//2

        const user = await userService.getUserById(id);//2

        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).json({
            success:true,
            data:user
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
    };

    async function updateUser(req,res){
        try{
            const {id} = req.params;

            const updatedUser = await userService.updateUser(id, req.body)

            if(!updatedUser){
                return res.status(404).json({
                    sucess:false,
                    message:"user not found"
                })
            }

            res.status(200).json({
                success:true,
                message:"user updated successfully",
                data:updatedUser
            })
        }
        catch(error){
            res.status(500).json({
                success:false,
                message:error.message
            });
        }
    }

async function deleteUser(req,res){
    try{
        const {id} = req.params

        const deleted = await userService.deleteUser(id)

        if(!deleted){
            return res.status(404).json({
                success:false,
                message:"user not found"
            })
        }
        res.status(200).json({
            sucess:true,
            message:"user deleted succesfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

    module.exports={
        getAllUsers,
        createUser,
        getUserById,
        updateUser,
        deleteUser
    }