const router = require(`express`).Router()

const { getEditor, createFile } = require(`../controllers/editor`)

router.get(`/editor/:id`, getEditor)
router.post(`/editor/:id`, createFile)

module.exports = router
