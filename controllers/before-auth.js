// imports !!
const { StatusCodes } = require("http-status-codes")
const User = require(`../models/User.js`)
const handleErrors = require("../errors/error_handler.js")
require(`dotenv`).config()

// functions !!
const home = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ success: true })
  } catch (error) {
    throw Error(`Something went wrong.`)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

// ///////////////////////////////

// functions !!
const loginGet = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ success: true })
  } catch (error) {
    throw Error(`Something went wrong.`)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      throw Error(`User not found.`)
    }
    const match = await user.comparePasswords(password)

    if (!match) {
      throw Error(`Incorrect password.`)
    }

    if (!user.active) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        err: `Your email account is not validated, please confirm your email address before logging in.`,
      })
    }

    const token = user.createToken()

    res.cookie(`token`, token, { httpOnly: true })

    res.status(StatusCodes.OK).json({ user: user._id })
  } catch (error) {
    const { email, password } = handleErrors(error)
    res.status(StatusCodes.BAD_REQUEST).json({ errors: { email, password } })
  }
}

// ///////////////////////////////////

// functions !!
const signupGet = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({ success: true })
  } catch (error) {
    throw Error(`Something went wrong.`)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error })
  }
}

const signup = async (req, res) => {
  try {
    const user = await User.create({ ...req.body })
    const token = await user.createToken()

    res
      .status(StatusCodes.CREATED)
      .cookie(`token`, token, {
        secure: false,
        httpOnly: true,
      })
      .json({ user: user._id, token })
  } catch (error) {
    const errors = handleErrors(error)
    res.status(StatusCodes.BAD_REQUEST).json({ errors })
  }
}

const logout = async (req, res) => {
  try {
    res.status(StatusCodes.OK).cookie("token", "", { maxAge: 1 }).json({
      success: true,
    })
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      err: err.message,
    })
  }
}

// Exports
module.exports = {
  home,
  loginGet,
  signupGet,
  login,
  signup,
  logout,
}
