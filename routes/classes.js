const router = require(`express`).Router()

const {
  getAllClasses,
  createClass,
  getSelectedClass,
  getAllStudents,
  getClassStudents,
  deleteStudent,
  patchClass,
  deleteClass,
} = require("../controllers/classes")

router.get(`/classes/:id`, getAllClasses)
router.post(`/classes/:id`, createClass)
router.get(`/class/:id`, getSelectedClass)
router.get(`/students`, getAllStudents)
router.get(`/students/:id`, getClassStudents)
router.patch(`/students/:id`, deleteStudent)
router.patch(`/class/:id`, patchClass)
router.delete(`/class/:id`, deleteClass)

module.exports = router
