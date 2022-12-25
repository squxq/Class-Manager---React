const { StatusCodes } = require(`http-status-codes`)

const confirmation = async (req, res) => {
    try {
        res
            .status(StatusCodes.OK)
            .json({ success: true })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            err: err.message,
        })
    }
}

module.exports = confirmation