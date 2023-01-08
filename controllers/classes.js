const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const Class = require("../models/Class")
const classesErrors = require("../errors/classes-errors")

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
    User.findById(req.params.id, async (err, user) => {
      try {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: `User not found.`,
          })
        }
        const { className: name, studentsStatus: status, studentsId } = req.body

        const students = studentsId.map(async (studentId) => {
          return await User.findById(studentId)
        })

        const newClass = await Class.create({
          name,
          status,
          teacher: user._id,
          students,
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

        res.status(StatusCodes.OK).json({
          success: true,
          classes,
          total,
        })
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

      res.status(StatusCodes.OK).json({
        success: true,
        class: {
          name: selectedClass.name,
          status: selectedClass.status,
          students: selectedClass.students,
        },
      })
    })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      err: `Something went wrong, please try again later.`,
    })
  }
}

const getAllStudents = async (req, res) => {
  try {
    User.find({ role: "Student" }, (err, docs) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          err: `Something went wrong please try again later.`,
        })
      }
      if (docs.length === 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: `No students found.`,
        })
      }
      const studentsArray = [...docs]
      const students = studentsArray.map((student) => {
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
        total: students.length,
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
  getAllClasses,
  createClass,
  getSelectedClass,
  getAllStudents,
}
