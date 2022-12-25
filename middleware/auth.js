const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const { StatusCodes } = require(`http-status-codes`)

const auth = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) { 
        return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: `Token not found.`
        })
    }

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET)

        if(!decoded) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                err: `Invalid token.`
            })
        }

        const { id, firstname, lastname } = decoded
        req.user = { id, firstname, lastname }
        next()
    } catch (error) {
        throw Error(error.message)
    }
}

module.exports = auth