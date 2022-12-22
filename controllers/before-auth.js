// imports !!
const { StatusCodes } = require('http-status-codes')
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

        const token = user.createToken()

        res.cookie(`token`, token, { httpOnly: true })

        res
            .status(StatusCodes.OK)
            .json({ user: user._id })
    } catch (error) {
        const { email, password } = handleErrors(error)
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors: { email, password } })
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

        res.cookie(`token`, token, {
            httpOnly: true,
        })

        res
            .status(StatusCodes.CREATED)
            .json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error)
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ errors })
    }
}

// Exports 
module.exports = {
    home,
    loginGet,
    signupGet,
    login,
    signup,
}