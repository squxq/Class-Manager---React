const router = require("express").Router()

const { getEvents, postEvent, getSingleEvent, patchEvent, deleteEvent } = require("../controllers/calendar")

router.post("/calendar/:id", postEvent)
router.get("/calendar/:id", getEvents)

// get single event 
router.get("/event/:id", getSingleEvent)
router.patch("/event/:id", patchEvent)
router.delete("/event/:id", deleteEvent)

module.exports = router
