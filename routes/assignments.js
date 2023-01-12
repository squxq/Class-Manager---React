const router = require(`express`).Router()

const { getAllAssignments } = require(`../controllers/assignments`)

router.get(`/assignments/:id`, getAllAssignments)

module.exports = router
