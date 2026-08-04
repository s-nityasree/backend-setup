const registrationService = require("../services/registrationService")
async function registerEvent(req,res) {
    try{
        const studentId = req.user.id;//rolemiddleware 1
        const {event_id} = req.body;

        const registration = await registrationService.registerEvent(studentId, event_id)

        res.status(201).json({
            success:true,
            message:"registration successful",
            data:registration
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

async function getAllregistrations(req,res){
    try{
        const registrations = await registrationService.getAllregistrations()

        res.status(200).json({
            success:true,
            data:registrations
        })
    }
    catch(error){
        res.status(500).json({
            sucess:false,
            error:error.message
        })
    }
}

async function getRegistrationById(req,res){
    try{
        const {id}= req.params;
        const registration = await registrationService.getRegistrationById(id)
        if(!registration){
            return res.status(404).json({
                success:false,
                message:"registration not found"
            })
        }

        res.status(200).json({
            success:true,
            data:registration
        })
    }
    catch(error){
        res.status(500).json({
            sucess:false,
            message:error.message
        })
    }
}

async function cancelRegistration(req,res){

    try{
        const {id} = req.params

        const deleted = await registrationService.cancelRegistration(id);
        if(!deleted){
            return res.status(404).json({
                success:false,
                message:"registration not found"
            })
        }

        res.status(200).json({
            success:true,
            message:"registration cancelled succesfully"
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
    registerEvent,
    getAllregistrations,
    getRegistrationById,
    cancelRegistration
}