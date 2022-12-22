const router = require(`express`).Router()

const { home, loginGet, signupGet, login, signup } = require('../controllers/before-auth')

router.get(`/`, home)
router.get(`/login`, loginGet)
router.post(`/login`, login)
router.get(`/signup`, signupGet)
router.post(`/signup`, signup)

module.exports = router