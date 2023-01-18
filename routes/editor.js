const router = require(`express`).Router()

const {
  getEditor,
  createFile,
  getSingleFile,
  patchSheet,
} = require(`../controllers/editor`)

router.get(`/editor/:id`, getEditor)
router.post(`/editor/:id`, createFile)
router.get(`/file/:id`, getSingleFile)
router.patch(`/file/:id`, patchSheet)

module.exports = router
