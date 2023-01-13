const { StatusCodes } = require(`http-status-codes`)
const User = require(`../models/User`)
const Class = require(`../models/Class`)
const Assignments = require(`../models/Assignments`)

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

      Class.find({ teacher: user._id }, (err, classes) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }

        const readyToGoClasses = classes.map((sClass) => {
          return {
            id: sClass._id,
            name: sClass.name,
          }
        })

        Assignments.find({ teacher: user._id }, (err, docs) => {
          if (err) {
            return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              err: err.message,
            })
          }

          res.status(StatusCodes.OK).json({
            success: true,
            classes: readyToGoClasses,
            assignments: docs,
          })
        })
      })
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

const createAssignment = async (req, res) => {
  try {
    const { id: teacherId } = req.params
    const {
      assignmentName,
      assignmentStartDate,
      assignmentEndDate,
      assignmentInstructions,
      assignmentStatus,
      classes,
    } = req.body
    User.findById(teacherId, async (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }

      const toGoClasses = classes.map(async (singleClass) => {
        const foundClass = await Class.findById(singleClass.id)
        return foundClass._id
      })

      const newAssignment = await Assignments.create({
        name: assignmentName,
        start: assignmentStartDate,
        end: assignmentEndDate,
        instructions: assignmentInstructions,
        status: assignmentStatus,
        classes: toGoClasses,
        teacher: user._id,
      })
      console.log(toGoClasses)
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
  createAssignment,
}
