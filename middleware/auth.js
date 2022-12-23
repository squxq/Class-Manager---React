const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const { StatusCodes } = require(`http-status-codes`)

const auth = async (req, res, next) => {
    const token = req.cookies.token
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded);
            next()
        }
    } catch (error) {
        // throw Error(`Something went wrong.`)
    }
}

module.exports = auth