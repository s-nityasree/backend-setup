const express = require("express")

const verifyToken = require("../middleware/authMiddleware")
const authorizeRoles = require("../middleware/roleMiddleware")
const reportController = require("../controllers/reportController")
const router = express.Router()

//event summary
router.get('/event-summary',verifyToken,authorizeRoles("FCAULTY"),reportController.getEventSummary)
//students registered for one event
router.get("/event/:id",verifyToken, authorizeRoles("FCAULTY"), reportController.getStudentByEvent)
//student summary
router.get('/student-summary',verifyToken,authorizeRoles("FCAULTY"),reportController.getStudentSummary)

module.exports=router