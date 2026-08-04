const express = require("express")
const registrationController=require("../controllers/registrationController")
const verifyToken= require("../middleware/authMiddleware")
const authorizeRoles=require("../middleware/roleMiddleware")

const router = express.Router()

router.post('/',verifyToken, authorizeRoles("STUDENT"),registrationController.registerEvent)

router.get("/",verifyToken,registrationController.getAllregistrations)

router.get("/:id",verifyToken,registrationController.getRegistrationById)

router.delete("/:id",verifyToken,authorizeRoles("STUDENT"),registrationController.cancelRegistration)

module.exports = router