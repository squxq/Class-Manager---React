const router = require(`express`).Router()

const { getAllSummaries } = require("../controllers/summaries")

router.get(`/summaries/:id`, getAllSummaries)

module.exports = router
