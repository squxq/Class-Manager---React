const router = require(`express`).Router()

const confirmation = require(`../controllers/confirmation`)

router.get(`/`, confirmation)

module.exports = router