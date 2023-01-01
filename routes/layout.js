const router = require(`express`).Router()

const layoutAuth = require(`../middleware/layout-auth`)

router.get(`/layout`, layoutAuth)

module.exports = router
