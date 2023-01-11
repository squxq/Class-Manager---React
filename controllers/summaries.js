const { StatusCodes } = require(`http-status-codes`)
const Summaries = require(`../models/Summaries`)
const Class = require(`../models/Class`)
const User = require(`../models/User`)

const getAllSummaries = async (req, res) => {
  try {
    const { id: teacherId } = req.params
    Class.find({ teacher: teacherId }, (err, docs) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }

      const classes = docs.map((doc) => {
        return {
          id: doc._id,
          name: doc.name,
        }
      })

      Summaries.find({ teacher: teacherId }, (err, docs) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }

        const summaries = docs.map((doc) => {
          // const docs = await Class.find({ _id: doc.class })
          return {
            id: doc._id,
            created: doc.createdAt,
            state: doc.state,
            class: doc._id,
            number: doc.number,
            content: doc.content,
            updated: doc.updatedAt,
          }
        })
        console.log(summaries)

        return res.status(StatusCodes.OK).json({
          success: true,
          classes,
          summaries,
        })
      })
    })
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      err: err.message,
    })
  }
}

const createSummary = async (req, res) => {
  try {
    const { id: teacherId } = req.params
    const { class: classId } = req.body

    User.find({ _id: teacherId }, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }
      Class.find({ _id: classId }, (err, focusedClass) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }
        if (
          JSON.stringify(focusedClass[0].teacher).match(/"(.*?)"/)[1] ===
          JSON.stringify(user[0]._id).match(/"(.*?)"/)[1]
        ) {
          Summaries.find({ class: focusedClass[0]._id }, async (err, docs) => {
            if (err) {
              return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                err: err.message,
              })
            }
            const number = docs.length
            const summary = await Summaries.create({
              number,
              state: "Pending",
              content: "Double tap to edit the summary's content.",
              teacher: user[0]._id,
              class: focusedClass[0]._id,
            })
            return res.status(StatusCodes.CREATED).json({
              success: true,
              summary: {
                id: summary._id,
                created: summary.createdAt,
                state: summary.state,
                class: summary._id,
                number: summary.number,
                content: summary.content,
                updated: summary.updatedAt,
              },
            })
          })
        } else {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: true,
            err: `Something went wrong please try again later...`,
          })
        }
      })
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
  createSummary,
}
