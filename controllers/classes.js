const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const Class = require("../models/Class")
const classesErrors = require("../errors/classes-errors")
const mongoose = require("mongoose")
const Summaries = require("../models/Summaries")
const Assignments = require("../models/Assignments")

const classRewrite = (docs) => {
  const classesArray = [...docs]
  const classes = classesArray.map((singleClass) => {
    return {
      key: singleClass._id,
      name: singleClass.name,
      status: singleClass.status,
      students: singleClass.students.length,
    }
  })
  return classes
}

const getAllClasses = async (req, res) => {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: `User not found.`,
        })
      }
      Class.find({ teacher: user._id }, async (err, docs) => {
        try {
          if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              success: false,
              err: `Something went wrong, please try again later.`,
            })
          }
          const classes = classRewrite(docs)
          return res.status(StatusCodes.OK).json({
            success: true,
            classes,
          })
        } catch (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            err: `Something went wrong please try again later.`,
          })
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

const createClass = async (req, res) => {
  try {
    const { className: name, studentsStatus: status, studentsId } = req.body
    User.findById(req.params.id, async (err, user) => {
      try {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: `User not found.`,
          })
        }

        User.find(
          {
            _id: {
              $in: studentsId.map((student) => {
                return mongoose.Types.ObjectId(student)
              }),
            },
          },
          async (err, users) => {
            if (err) {
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                err: `Something went wrong, please try again later.`,
              })
            }
            const newClass = await Class.create({
              name,
              status,
              teacher: user._id,
              students: users,
            })

            if (!newClass) {
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                err: `Something went wrong please try again later.`,
              })
            }

            const docs = await Class.find({ teacher: user._id })

            const classes = classRewrite(docs)

            const total = await Class.count({ teacher: user._id })

            res.status(StatusCodes.CREATED).json({
              success: true,
              classes,
              total,
            })
          }
        )
      } catch (err) {
        const errors = classesErrors(err)
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          errors,
        })
      }
    })
  } catch (err) {
    res.status().json({
      success: false,
      err: err.message,
    })
  }
}

const getSelectedClass = async (req, res) => {
  try {
    Class.findById(req.params.id, (err, selectedClass) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: `Class not found.`,
        })
      }
      if (!selectedClass) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: `Class not found.`,
        })
      }

      const students = selectedClass.students.map((student) => {
        return {
          id: student._id,
          firstName: student.firstname,
          lastName: student.lastname,
          email: student.email,
        }
      })

      res.status(StatusCodes.OK).json({
        success: true,
        class: {
          name: selectedClass.name,
          status: selectedClass.status,
          students: students,
        },
        total: students.length,
      })
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: `Something went wrong, please try again later.`,
    })
  }
}

const getClassStudents = async (req, res) => {
  try {
    const { id, searchInput = "" } = req.query

    Class.findById(id, async (err, focusClass) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: `Class not found.`,
        })
      }

      if (searchInput.indexOf(" ") >= 0) {
        const searchInputArray = searchInput.split(" ")
        let docs = await User.find({
          role: "Student",
          $and: [
            { firstname: { $regex: searchInputArray[0], $options: "i" } },
            { lastname: { $regex: searchInputArray[1], $options: "i" } },
          ],
        })
        if (docs.length === 0) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: `No students found.`,
          })
        }

        let newStudentsArray = []

        for (let doc of docs) {
          const docId = JSON.stringify(doc._id).match(/"(.*?)"/)[1]

          const match = focusClass.students.find(
            (student) =>
              JSON.stringify(student._id).match(/"(.*?)"/)[1] === docId
          )
          if (match) {
            newStudentsArray.push(match)
          }
        }

        const studentsArray = [...newStudentsArray]
        const students = studentsArray.map((student) => {
          return {
            id: student._id,
            firstName: student.firstname,
            lastName: student.lastname,
            email: student.email,
          }
        })

        return res.status(StatusCodes.OK).json({
          success: true,
          students,
          total: students.length,
        })
      } else {
        const docs = await User.find({
          role: "Student",
          $or: [
            { firstname: { $regex: searchInput, $options: "i" } },
            { lastname: { $regex: searchInput, $options: "i" } },
            { email: { $regex: searchInput, $options: "i" } },
          ],
        })

        if (docs.length === 0) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: `No students found.`,
          })
        }

        let newStudentsArray = []

        for (let doc of docs) {
          const docId = JSON.stringify(doc._id).match(/"(.*?)"/)[1]

          const match = focusClass.students.find(
            (student) =>
              JSON.stringify(student._id).match(/"(.*?)"/)[1] === docId
          )
          if (match) {
            newStudentsArray.push(match)
          }
        }

        const studentsArray = [...newStudentsArray]
        const students = studentsArray.map((student) => {
          return {
            id: student._id,
            firstName: student.firstname,
            lastName: student.lastname,
            email: student.email,
          }
        })

        return res.status(StatusCodes.OK).json({
          success: true,
          students,
          total: students.length,
        })
      }
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

const getAllStudents = async (req, res) => {
  try {
    User.find({ role: "Student" }, (err, docs) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: `No students found.`,
        })
      }
      const students = docs.map((student) => {
        return {
          id: student._id,
          firstName: student.firstname,
          lastName: student.lastname,
        }
      })

      res.status(StatusCodes.OK).json({
        success: true,
        students,
      })
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.body
    const { id: classId } = req.params

    Class.findById(classId, (err, selectedClass) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          err: err.message,
        })
      }
      if (!selectedClass) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: "Class not found.",
        })
      }

      const userToDelete = selectedClass.students.find(
        (student) =>
          JSON.stringify(student._id).match(/"(.*?)"/)[1] === studentId
      )
      selectedClass.students.splice(
        selectedClass.students.indexOf(userToDelete),
        1
      )

      Class.findOneAndUpdate(
        { _id: classId },
        { students: selectedClass.students },
        { new: true },
        (err, newClass) => {
          if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              success: false,
              err: err.message,
            })
          }

          const students = selectedClass.students.map((student) => {
            return {
              id: student._id,
              firstName: student.firstname,
              lastName: student.lastname,
              email: student.email,
            }
          })

          res.status(StatusCodes.OK).json({
            success: true,
            students,
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

const patchClass = (req, res) => {
  try {
    const { id: classId } = req.params
    const { name, status, students } = req.body

    console.log(students)

    User.find(
      {
        _id: {
          $in: students.map((student) => mongoose.Types.ObjectId(student)),
        },
      },
      (err, docs) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }

        Class.findOneAndUpdate(
          { _id: classId },
          { name, status, $push: { students: { $each: docs } } },
          { new: true },
          (err, updatedClass) => {
            if (err) {
              return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                err: err.message,
              })
            }

            console.log(updatedClass)

            const students = updatedClass.students.map((student) => {
              return {
                id: student._id,
                firstName: student.firstname,
                lastName: student.lastname,
                email: student.email,
              }
            })

            res.status(StatusCodes.OK).json({
              success: true,
              class: {
                name: updatedClass.name,
                status: updatedClass.status,
                students: students,
              },
              total: students.length,
            })
          }
        )
      }
    )
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

const deleteClass = (req, res) => {
  try {
    const { id } = req.params
    Class.findOneAndDelete(
      { _id: mongoose.Types.ObjectId(id) },
      (err, deletedClass) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }

        Summaries.deleteMany({ class: deletedClass._id }, (err, docs) => {
          if (err) {
            return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              err: err.message,
            })
          }

          Assignments.deleteMany({ classes: deletedClass._id }, (err, docs) => {
            if (err) {
              return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                err: err.message,
              })
            }

            return res.status(StatusCodes.OK).json({
              success: true,
              deleteClass: deletedClass._id,
            })
          })
        })
      }
    )
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: err.message,
    })
  }
}

module.exports = {
  getAllClasses,
  createClass,
  getSelectedClass,
  getAllStudents,
  getClassStudents,
  deleteStudent,
  patchClass,
  deleteClass,
}
