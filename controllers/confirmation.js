const { StatusCodes } = require(`http-status-codes`)

const confirmation = async (req, res) => {
    try {
        res
            .status(StatusCodes.OK)
            .json({ success: true })
    } catch (error) {
        res
            .status(StatusCodes.BAD_REQUEST)
            .json({ success: false })
    }
}

module.exports = confirmation