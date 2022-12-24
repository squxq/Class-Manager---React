const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const { StatusCodes } = require(`http-status-codes`)

const auth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) { 
        throw new Error(`No token provided.`)
    }

    try {
        // const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // const { id, firstname, lastname } = decoded
        // req.user = { id, firstname, lastname }
        // next()

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) { throw new Error(`Unauthorized.`) }
            const { id, firstname, lastname } = decoded
            req.user = { id, firstname, lastname }
            next()
        })
    } catch (error) {
        next(error)
    }
}

module.exports = auth