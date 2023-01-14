const { StatusCodes } = require(`http-status-codes`)
const User = require(`../models/User`)
const Class = require(`../models/Class`)
const Assignments = require(`../models/Assignments`)
const mongoose = require(`mongoose`)

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
    let {
      assignmentName,
      assignmentStartDate,
      assignmentEndDate,
      assignmentInstructions,
      assignmentStatus,
      classes,
    } = req.body
    User.findById(teacherId, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }

      Class.find(
        {
          _id: {
            $in: classes.map((sClass) => {
              return mongoose.Types.ObjectId(sClass.id)
            }),
          },
        },
        async (err, docs) => {
          if (err) {
            return res.status(StatusCodes.BAD_REQUEST).json({
              success: false,
              err: err.message,
            })
          }

          if (Object.keys(assignmentStartDate).length === 0) {
            assignmentStartDate = new Date().toISOString()
          }
          if (Object.keys(assignmentEndDate).length === 0) {
            assignmentEndDate = new Date(
              new Date().setHours(new Date().getHours() + 1)
            ).toISOString()
          }

          const newAssignment = await Assignments.create({
            name: assignmentName,
            start: assignmentStartDate,
            end: assignmentEndDate,
            instructions: assignmentInstructions,
            status: assignmentStatus,
            classes: docs.map((doc) => {
              return doc._id
            }),
            teacher: user._id,
          })

          return res.status(StatusCodes.CREATED).json({
            success: true,
            newAssignment,
          })
        }
      )
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
