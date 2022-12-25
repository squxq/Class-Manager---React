const { StatusCodes } = require(`http-status-codes`)

const confirmation = async (req, res) => {
    const { firstname } = req.user
    try {
        res
            .status(StatusCodes.OK)
            .json({ 
                success: true,
                firstname,
            })
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            err: err.message,
        })
    }
}

module.exports = confirmation