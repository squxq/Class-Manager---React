const { StatusCodes } = require(`http-status-codes`)
const User = require(`../models/User`)
const Class = require(`../models/Class`)
const Assignments = require(`../models/Assignments`)
const mongoose = require(`mongoose`)
const Answer = require(`../models/Answer`)

const getAllAssignments = (req, res) => {
  try {
    const { id: teacherId } = req.params
    const { status } = req.query
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

        if (status === "Assigned") {
          Assignments.find(
            { teacher: user._id },
            null,
            { sort: { updatedAt: -1 } },
            (err, docs) => {
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
            }
          )
        } else {
          Assignments.find(
            { teacher: user._id, status: status },
            null,
            { sort: { updatedAt: -1 } },
            (err, docs) => {
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
            }
          )
        }
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

const getSingleAssignment = async (req, res) => {
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
      Assignments.findById(assignmentId, (err, assignment) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }

        Class.find(
          {
            _id: { $in: assignment.classes },
          },
          (err, docs) => {
            if (err) {
              return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                err: err.message,
              })
            }
            return res.status(StatusCodes.OK).json({
              success: true,
              assignment,
              classes: docs.map((doc) => doc.name),
            })
          }
        )
      })
    })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

const patchAssignment = async (req, res) => {
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
    const { id: assignmentId } = req.query
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
            $in: classes.map((singleClass) => {
              return mongoose.Types.ObjectId(singleClass.id)
            }),
          },
        },
        (err, docs) => {
          if (err) {
            return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              err: err.message,
            })
          }

          Assignments.findOneAndUpdate(
            { _id: assignmentId },
            {
              name: assignmentName,
              start: assignmentStartDate,
              end: assignmentEndDate,
              instructions: assignmentInstructions,
              status: assignmentStatus,
              classes: docs.map((doc) => {
                return doc._id
              }),
            },
            { new: true },
            (err, assignment) => {
              if (err) {
                return res.status(StatusCodes).json({
                  success: false,
                  err: err.message,
                })
              }

              Assignments.find(
                { teacher: user._id },
                null,
                { sort: { updatedAt: -1 } },
                (err, docs) => {
                  if (err) {
                    return res.status(StatusCodes.NOT_FOUND).json({
                      success: false,
                      err: err.message,
                    })
                  }

                  return res.status(StatusCodes.OK).json({
                    success: true,
                    assignments: docs,
                  })
                }
              )
            }
          )
        }
      )
    })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

const deleteAssignment = (req, res) => {
  try {
    const { id: teacherId } = req.params
    const { id: assignmentId } = req.query
    User.findById(teacherId, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }

      Assignments.findOneAndDelete({ _id: assignmentId }, (err, assignment) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }

        Assignments.find(
          { teacher: user._id },
          null,
          { sort: { updatedAt: -1 } },
          (err, docs) => {
            if (err) {
              return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                err: err.message,
              })
            }

            return res.status(StatusCodes.OK).json({
              success: true,
              assignments: docs,
            })
          }
        )
      })
    })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

const getAllAnswers = (req, res) => {
  try {
    const { id: teacherId } = req.params
    const { id: assignmentId } = req.query
    User.findById(teacherId, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }

      Assignments.findById(assignmentId, (err, assignment) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }

        Class.find({ _id: { $in: assignment.classes } }, (err, docs) => {
          if (err) {
            return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              err: err.message,
            })
          }

          const studentsIds = Array.from(
            new Set(
              [].concat(
                ...docs.map((doc) => {
                  const docStudents = doc.students.map((student) => {
                    return student._id
                  })
                  return docStudents
                })
              )
            )
          )

          User.find({ _id: { $in: studentsIds } }, (err, students) => {
            if (err) {
              return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                err: err.message,
              })
            }

            Answer.find(
              { assignment: assignmentId },
              null,
              { sort: { createdAt: -1 } },
              (err, answers) => {
                if (err) {
                  return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    err: err.message,
                  })
                }
                const studentsTurnedIn = answers.map((ans) => {
                  return ans.student
                })

                const tableItems = students.map((student, index) => {
                  if (studentsTurnedIn.includes(student._id)) {
                    return {
                      id: student._id,
                      name: `${student.firstname} ${student.lastname}`,
                      email: student.email,
                      status: "Turned in",
                      grade: answers[index].grade,
                      feedback: answers[index].feedback,
                      deliveryDate: answers[index].deliveryDate,
                    }
                  } else {
                    return {
                      id: student._id,
                      name: `${student.firstname} ${student.lastname}`,
                      email: student.email,
                      status: "Not turned in",
                    }
                  }
                })

                return res.status(StatusCodes.OK).json({
                  success: true,
                  answers: tableItems,
                })
              }
            )
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

module.exports = {
  getAllAssignments,
  createAssignment,
  getSingleAssignment,
  patchAssignment,
  deleteAssignment,
  getAllAnswers,
}
