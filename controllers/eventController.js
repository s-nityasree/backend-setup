const eventService = require("../services/eventService")

async function createEvent(req,res){
    try{
        const event = await eventService.createEvent(req.body, req.user.id)//req.user =1 ajay ajay@gmail.com admin

        res.status(201).json({
            success:true,
            message:"event created successfully",
            data:event
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function getAllEvents(req,res){
    try{
        const events = await eventService.getAllEvents()

        res.status(200).json({
            success:true,
            message:"events fetched successfully",
            data:events
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

async function getEventById(req,res){
    try{
        const {id} = req.params;
        const event = await eventService.getEventById(id)

        if(!event){
            return res.status(404).json({
                success:false,
                message:"event not found"
            })
        }
        res.status(200).json({
            success:true,
            data:event
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById
}