const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const { StatusCodes } = require(`http-status-codes`)

const auth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) { 
        throw Error(`No token provided.`)
    }

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET)
        const { id, firstname, lastname } = decoded
        req.user = { id, firstname, lastname }
        next()
    } catch (error) {
        throw Error(`Not authorized to access this route.`)
    }
}

module.exports = auth