const router = require(`express`).Router()

const confirmation = require(`../controllers/confirmation`)

// auth middleware
const auth = require(`../middleware/auth`)

router.get(`/confirmation/:id`, confirmation)

module.exports = router