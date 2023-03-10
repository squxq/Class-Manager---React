const router = require(`express`).Router()

const {
  getAllAssignments,
  createAssignment,
  getSingleAssignment,
  patchAssignment,
  deleteAssignment,
  getAllAnswers,
  patchAnswer,
  createAnswer,
} = require(`../controllers/assignments`)

router.get(`/assignments/:id`, getAllAssignments)
router.post(`/assignments/:id`, createAssignment)
router.get(`/assignment/:id`, getSingleAssignment)
router.patch(`/assignments/:id`, patchAssignment)
router.delete(`/assignments/:id`, deleteAssignment)

router.get(`/answers/:id`, getAllAnswers)
router.patch(`/answers/:id`, patchAnswer)
router.post(`/answers/:id`, createAnswer)

module.exports = router
