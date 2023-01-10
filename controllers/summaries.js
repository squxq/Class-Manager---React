const { StatusCodes } = require(`http-status-codes`)
const Summaries = require(`../models/Summaries`)

const getAllSummaries = async (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      success: true,
    })
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      err: err.message,
    })
  }
}

module.exports = {
  getAllSummaries,
}
