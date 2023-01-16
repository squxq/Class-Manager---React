const { StatusCodes } = require(`http-status-codes`)
const User = require("../models/User")
const { utils } = require(`xlsx`)
const Excel = require("../models/Excel")

const getEditor = (req, res) => {
  try {
    const { id: teacherId } = req.params
    User.findById(teacherId, (err, user) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          err: err.message,
        })
      }
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: "User not found...",
        })
      }

      Excel.find({ teacher: teacherId }, (err, docs) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            err: err.message,
          })
        }
        if (user.docs === 0) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: "No files found...",
          })
        }

        return res.status(StatusCodes.OK).json({
          success: true,
          filenames: docs.map((doc) => {
            return {
              id: doc._id,
              name: doc.fileName,
            }
          }),
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

const createFile = (req, res) => {
  try {
    const { id: teacherId } = req.params
    let { file: workbook, filename } = req.body
    User.findById(teacherId, (err, user) => {
      if (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          err: err.message,
        })
      }
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          err: "User not found...",
        })
      }

      filename = filename.split(".")[0]

      Excel.find(
        {
          teacher: teacherId,
          fileName: filename,
        },
        async (err, excelFile) => {
          if (err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
              success: false,
              err: err.message,
            })
          }
          if (excelFile.length === 0) {
            const sheetNames = workbook.SheetNames
            let sheets = sheetNames.map((name, index) => {
              return utils.sheet_to_json(workbook.Sheets[sheetNames[index]])
            })

            sheets = [].concat(...sheets[0])

            if (workbook.Props.CreatedDate) {
              const fileCreatedDate = workbook.Props.CreatedDate
              const newFile = await Excel.create({
                fileName: filename,
                fileCreatedDate,
                sheets,
                teacher: user._id,
              })

              return res.status(StatusCodes.CREATED).json({
                success: true,
                file: {
                  id: newFile._id,
                  name: newFile.fileName,
                  createdAt: newFile.fileCreatedDate,
                  sheets: newFile.sheets,
                },
              })
            } else {
              const newFile = await Excel.create({
                fileName: filename,
                fileCreatedDate: new Date().toISOString(),
                sheets,
                teacher: user._id,
              })

              return res.status(StatusCodes.CREATED).json({
                success: true,
                file: {
                  id: newFile._id,
                  name: newFile.fileName,
                  createdAt: newFile.fileCreatedDate,
                  sheets: newFile.sheets,
                },
              })
            }
          } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
              success: false,
              err: "That name is already in use by one of your documents, please replace it with a unique value.",
            })
          }
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
  getEditor,
  createFile,
}
