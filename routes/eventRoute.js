const express = require("express")
const eventController = require("../controllers/eventController")
const verifyToken = require("../middleware/authMiddleware")
const authorizeRoles = require("../middleware/roleMiddleware")
const router = express.Router()

router.post('/',verifyToken, authorizeRoles("ADMIN"),eventController.createEvent)

router.get('/',verifyToken,eventController.getAllEvents)

router.get('/:id',verifyToken,eventController.getEventById)

router.put("/:id",  verifyToken,
    authorizeRoles("ADMIN"),eventController.updateEvent);

router.delete("/:id",  verifyToken,
    authorizeRoles("ADMIN"),eventController.deleteEvent);

module.exports = router;