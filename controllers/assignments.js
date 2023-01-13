const { StatusCodes } = require(`http-status-codes`)
const User = require(`../models/User`)

const getAllAssignments = (req, res) => {
  try {
    const { id: teacherId } = req.params
    const { cardId: assignmentId } = req.query
    User.findById(teacherId, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }
      res.status(StatusCodes.OK).json({
        success: true,
        user,
      })
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

module.exports = {
  getAllAssignments,
}
