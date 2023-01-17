const { StatusCodes } = require(`http-status-codes`)
const { utils } = require(`xlsx`)
const User = require("../models/User")
const Excel = require("../models/Excel")
const mongoose = require(`mongoose`)

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
            const sheets = sheetNames.map((name, index) => {
              return {
                name,
                values: utils.sheet_to_json(workbook.Sheets[sheetNames[index]]),
              }
            })

            const sheetsObj = sheets.reduce((obj, item) => {
              const values = item.values.map((row) => {
                row = { id: mongoose.Types.ObjectId(), ...row }
                return row
              })
              return Object.assign(obj, { [item.name]: values })
            }, {})

            try {
              const fileCreatedDate = workbook.Props.CreatedDate
              const newFile = await Excel.create({
                fileName: filename,
                fileCreatedDate,
                sheets: sheetsObj,
                teacher: user._id,
              })

              return res.status(StatusCodes.CREATED).json({
                success: true,
                file: {
                  id: newFile._id,
                  name: newFile.fileName,
                },
              })
            } catch (err) {
              const newFile = await Excel.create({
                fileName: filename,
                fileCreatedDate: new Date().toISOString(),
                sheets: sheetsObj,
                teacher: user._id,
              })

              return res.status(StatusCodes.CREATED).json({
                success: true,
                file: {
                  id: newFile._id,
                  name: newFile.fileName,
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

const getSingleFile = (req, res) => {
  try {
    const { id: teacherId } = req.params
    const { id: fileId, sheet: sheetIndex } = req.query
    console.log(fileId, sheetIndex)
    console.log(sheetIndex)
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

      Excel.findById(fileId, (err, file) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            err: err.message,
          })
        }
        if (!user) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: "File not found...",
          })
        }

        const sheet = file.sheets[Object.keys(file.sheets)[sheetIndex - 1]]

        const columnsSet = new Set(
          [].concat(
            ...sheet.map((row) => {
              return [...Object.keys(row)]
            })
          )
        )

        const columns = Array.from(columnsSet).map((column) => {
          return {
            field: column,
            headerName: column[0].toUpperCase() + column.substring(1),
            flex: 1,
          }
        })

        console.log(sheet)

        return res.status(StatusCodes.OK).json({
          success: true,
          pages: {
            pagesnames: Object.keys(file.sheets),
            pagescount: Object.keys(file.sheets).length,
          },
          sheet,
          columns,
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
  getEditor,
  createFile,
  getSingleFile,
}
