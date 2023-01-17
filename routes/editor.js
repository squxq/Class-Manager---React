const router = require(`express`).Router()

const {
  getEditor,
  createFile,
  getSingleFile,
} = require(`../controllers/editor`)

router.get(`/editor/:id`, getEditor)
router.post(`/editor/:id`, createFile)
router.get(`/file/:id`, getSingleFile)

module.exports = router
