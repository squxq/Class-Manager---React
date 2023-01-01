const router = require("express").Router()

const { getEvents, postEvent } = require("../controllers/calendar")

router.post("/calendar/:id", postEvent)
router.get("/calendar/:id", getEvents)

module.exports = router
