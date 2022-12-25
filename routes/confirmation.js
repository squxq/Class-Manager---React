const router = require(`express`).Router()

const { confirmation, verification } = require(`../controllers/confirmation`)

// auth middleware
const auth = require(`../middleware/auth`)

router.get(`/confirmation/:id`, auth, confirmation)
router.get(`/verification/:token`, verification)

module.exports = router