const router = require(`express`).Router()

const { dashboard } = require(`../controllers/dashboard`)
// const auth = require(`../middleware/auth`)

router.get(`/dashboard/:id`, dashboard)

module.exports = router
