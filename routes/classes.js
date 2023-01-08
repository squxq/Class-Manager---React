const router = require(`express`).Router()

const {
  getAllClasses,
  createClass,
  getSelectedClass,
  getAllStudents,
  getClassStudents,
  deleteStudent,
} = require("../controllers/classes")

router.get(`/classes/:id`, getAllClasses)
router.post(`/classes/:id`, createClass)
router.get(`/class/:id`, getSelectedClass)
router.get(`/students`, getAllStudents)
router.get(`/students/:id`, getClassStudents)
router.patch(`/students/:id`, deleteStudent)

module.exports = router
