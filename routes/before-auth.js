const router = require(`express`).Router()

const {
  home,
  loginGet,
  signupGet,
  login,
  signup,
  logout,
} = require("../controllers/before-auth")

router.get(`/`, home)
router.get(`/login`, loginGet)
router.post(`/login`, login)
router.get(`/signup`, signupGet)
router.post(`/signup`, signup)
router.get(`/logout`, logout)

module.exports = router
