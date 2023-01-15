const { StatusCodes } = require(`http-status-codes`)
const Summaries = require(`../models/Summaries`)
const Class = require(`../models/Class`)
const User = require(`../models/User`)

const getAllSummaries = async (req, res) => {
  try {
    const { id: userId } = req.params
    User.find({ _id: userId, role: "Teacher" }, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }
      if (!user[0]) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: "User is not a teacher",
        })
      }

      Class.find({ teacher: userId }, (err, docs) => {
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

        Summaries.find({ teacher: userId }, (err, docs) => {
          if (err) {
            return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              err: err.message,
            })
          }

          const summaries = docs
            .map((doc) => {
              for (let singleClass of classes) {
                if (
                  JSON.stringify(singleClass.id).match(/"(.*?)"/)[1] ===
                  JSON.stringify(doc.class).match(/"(.*?)"/)[1]
                ) {
                  return {
                    id: doc._id,
                    created: `${JSON.stringify(doc.createdAt)
                      .split("T")[0]
                      .slice(1)} - ${
                      JSON.stringify(doc.createdAt).split("T")[1].split(".")[0]
                    }`,
                    state: doc.state,
                    class: singleClass.name,
                    number: doc.number,
                    content: doc.content,
                    updated: `${JSON.stringify(doc.updatedAt)
                      .split("T")[0]
                      .slice(1)} - ${
                      JSON.stringify(doc.updatedAt).split("T")[1].split(".")[0]
                    }`,
                  }
                }
              }
            })
            .filter(Boolean)

          return res.status(StatusCodes.OK).json({
            success: true,
            classes,
            summaries,
          })
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
      console.log(user)
      Class.find({ _id: classId }, (err, focusedClass) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: err.message,
          })
        }
        console.log(focusedClass)
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
            const number = docs.length + 1
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
                created: `${JSON.stringify(summary.createdAt)
                  .split("T")[0]
                  .slice(1)} - ${
                  JSON.stringify(summary.createdAt).split("T")[1].split(".")[0]
                }`,
                state: summary.state,
                class: focusedClass[0].name,
                number: summary.number,
                content: summary.content,
                updated: `${JSON.stringify(summary.updatedAt)
                  .split("T")[0]
                  .slice(1)} - ${
                  JSON.stringify(summary.updatedAt).split("T")[1].split(".")[0]
                }`,
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

const patchSummary = async (req, res) => {
  try {
    const { id: summaryId, content: summaryContent } = req.body
    const { id: teacherId } = req.params
    User.find({ _id: teacherId }, (err, teacher) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }
      Summaries.findOneAndUpdate(
        { _id: summaryId },
        { content: summaryContent },
        { new: true },
        (err, summary) => {
          if (err) {
            return res.status(StatusCodes.NOT_FOUND).json({
              success: false,
              err: err.message,
            })
          }

          res.status(StatusCodes.OK).json({
            success: true,
            summary,
          })
        }
      )
    })
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      err: err.message,
    })
  }
}

const deleteSummary = async (req, res) => {
  try {
    const { id: teacherId } = req.params
    const { summaryId } = req.query
    User.find({ _id: teacherId }, (err, user) => {
      if (err) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: err.message,
        })
      }

      Summaries.findOneAndDelete({ _id: summaryId }, (err) => {
        if (err) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: `Summary not found...`,
          })
        }

        Summaries.find({ teacher: user[0]._id }, (err, docs) => {
          if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              success: false,
              err: err.message,
            })
          }

          Class.find({ teacher: user[0]._id }, (err, newDocs) => {
            if (err) {
              return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                err: err.message,
              })
            }

            const classes = newDocs.map((doc) => {
              return {
                id: doc._id,
                name: doc.name,
              }
            })

            const summaries = docs
              .map((doc) => {
                for (let singleClass of classes) {
                  if (
                    JSON.stringify(singleClass.id).match(/"(.*?)"/)[1] ===
                    JSON.stringify(doc.class).match(/"(.*?)"/)[1]
                  ) {
                    return {
                      id: doc._id,
                      created: `${JSON.stringify(doc.createdAt)
                        .split("T")[0]
                        .slice(1)} - ${
                        JSON.stringify(doc.createdAt)
                          .split("T")[1]
                          .split(".")[0]
                      }`,
                      state: doc.state,
                      class: singleClass.name,
                      number: doc.number,
                      content: doc.content,
                      updated: `${JSON.stringify(doc.updatedAt)
                        .split("T")[0]
                        .slice(1)} - ${
                        JSON.stringify(doc.updatedAt)
                          .split("T")[1]
                          .split(".")[0]
                      }`,
                    }
                  }
                }
              })
              .filter(Boolean)

            res.status(StatusCodes.OK).json({
              success: true,
              summaries,
            })
          })
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

module.exports = {
  getAllSummaries,
  createSummary,
  patchSummary,
  deleteSummary,
}
