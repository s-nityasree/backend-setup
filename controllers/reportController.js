const reportService = require("../services/reportService")
async function getEventSummary(req,res) {
    try{
        const report = await reportService.getEventSummary()

        res.status(200).json({
            success:true,
            data:report
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}

async function getStudentByEvent(req,res) {
    try{
        const {id} = req.params

    const report = await reportService.getStudentByEvent(id)
    res.status(200).json({
        success:true,
        data:report
    })
    }

    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}
async function getStudentSummary(req,res) {
    try{
        const report = await reportService.getStudentSummary()

    res.status(200).json({
        success:true,
        data:report
    })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
}
module.exports= {
    getEventSummary,
    getStudentByEvent,
    getStudentSummary
}