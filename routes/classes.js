const router = require(`express`).Router()

const { getAllClasses } = require("../controllers/classes")

router.get(`/classes/:id`, getAllClasses)

module.exports = router
