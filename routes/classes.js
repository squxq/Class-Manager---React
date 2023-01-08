const router = require(`express`).Router()

const {
  getAllClasses,
  createClass,
  getSelectedClass,
  getAllStudents,
} = require("../controllers/classes")

router.get(`/classes/:id`, getAllClasses)
router.post(`/classes/:id`, createClass)
router.get(`/class/:id`, getSelectedClass)
router.get(`/students`, getAllStudents)

module.exports = router
