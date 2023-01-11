const router = require(`express`).Router()

const { getAllSummaries, createSummary } = require("../controllers/summaries")

router.get(`/summaries/:id`, getAllSummaries)
router.post(`/summaries/:id`, createSummary)

module.exports = router
