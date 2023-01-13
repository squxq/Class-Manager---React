const router = require(`express`).Router()

const {
  getAllAssignments,
  createAssignment,
} = require(`../controllers/assignments`)

router.get(`/assignments/:id`, getAllAssignments)
router.post(`/assignments/:id`, createAssignment)

module.exports = router
