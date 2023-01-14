const router = require(`express`).Router()

const {
  getAllAssignments,
  createAssignment,
  getSingleAssignment,
  patchAssignment,
  deleteAssignment,
} = require(`../controllers/assignments`)

router.get(`/assignments/:id`, getAllAssignments)
router.post(`/assignments/:id`, createAssignment)
router.get(`/assignment/:id`, getSingleAssignment)
router.patch(`/assignments/:id`, patchAssignment)
router.delete(`/assignments/:id`, deleteAssignment)

module.exports = router
