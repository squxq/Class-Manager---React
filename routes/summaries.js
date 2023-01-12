const router = require(`express`).Router()

const {
  getAllSummaries,
  createSummary,
  patchSummary,
  deleteSummary,
} = require("../controllers/summaries")

router.get(`/summaries/:id`, getAllSummaries)
router.post(`/summaries/:id`, createSummary)
router.patch(`/summaries/:id`, patchSummary)
router.delete(`/summaries/:id`, deleteSummary)

module.exports = router
