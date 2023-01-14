const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const { StatusCodes } = require(`http-status-codes`)
const User = require(`../models/User`)

const greetings = [
  [22, "Good night"],
  [18, "Good evening"],
  [12, "Good afternoon"],
  [7, "Good morning"],
  [4, "Whoa, early bird"],
  [0, "Working late"],
]

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
      try {
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

        const hours = new Date().getHours()

        mainLoop: for (let i = 0; i < greetings.length; i++) {
          if (hours >= greetings[i][0]) {
            const data = `${greetings[i][1]}, ${user.firstname} !!`
            res.status(200).json({
              success: true,
              user: {
                userId: id,
                role: user.role,
                name: `${user.firstname} ${user.lastname}`,
              },
              data,
            })
            break mainLoop
          }
        }
      } catch (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          err: err.message,
        })
      }
    })
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      err: `Something went wrong, please try again later.`,
    })
  }
}

module.exports = layoutAuth
