const router = require(`express`).Router()

const { getEditor } = require(`../controllers/editor`)

router.get(`/editor/:id`, getEditor)

module.exports = router
