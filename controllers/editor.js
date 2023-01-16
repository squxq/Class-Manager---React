const { StatusCodes } = require(`http-status-codes`)

const getEditor = (req, res) => {
  try {
    res.status(StatusCodes.OK).json({
      success: false,
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

module.exports = {
  getEditor,
}
