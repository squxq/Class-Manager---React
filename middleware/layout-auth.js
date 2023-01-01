const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const { StatusCodes } = require(`http-status-codes`)
const User = require(`../models/User`)

const layoutAuth = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      err: `Token not found.`,
    })
  }

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        err: `Invalid token.`,
      })
    }

    const { id, firstname, email } = decoded
    User.findById(id, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: `User not found.`,
        })
      }
      if (user.email !== email) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          err: `Unauthorized to access this route.`,
        })
      }
      if (!user.active) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          err: `Account not active.`,
        })
      }
      res.status(200).json({
        success: true,
        userId: id,
      })
    })
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      err: `Something went wrong, please try again later.`,
    })
  }
}

module.exports = layoutAuth
