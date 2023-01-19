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

            const newFile = await Excel.create({
              fileName: filename,
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
        if (!file) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: "File not found...",
          })
        }

        let sheet = file.sheets[Object.keys(file.sheets)[sheetIndex - 1]]

        const columnsSet = new Set(
          [].concat(
            ...sheet.map((row) => {
              return [...Object.keys(row)]
            })
          )
        )
        sheet.push({
          id: "insertId",
          rows: "insert",
        })

        const columns = Array.from(columnsSet)
          .map((column) => {
            if (column !== "id") {
              return {
                field: column,
                headerName: column[0].toUpperCase() + column.substring(1),
                sortable: false,
                align: "center",
                editable: true,
              }
            }
          })
          .filter(Boolean)

        return res.status(StatusCodes.OK).json({
          success: true,
          pages: {
            pagesnames: Object.keys(file.sheets),
            pagescount: Object.keys(file.sheets).length,
          },
          sheet,
          sheetname: Object.keys(file.sheets)[sheetIndex - 1],
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

const patchSheet = (req, res) => {
  try {
    const { id: fileId } = req.params
    const { type, data, columnName } = req.body
    const { sheetname, columns } = req.query

    if (Object.entries(data).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        err: `Please provide at least one value for the row...`,
      })
    }

    const verificationArray = Object.values(data).filter((value) => !value)

    if (type === "column" && !columnName) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        err: `Please provide a valid column name...`,
      })
    }

    if (verificationArray.length === 0) {
      Excel.findById(fileId, async (err, file) => {
        if (err) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            err: err.message,
          })
        }
        if (!file) {
          return res.status(StatusCodes.NOT_FOUND).json({
            success: false,
            err: "File not found...",
          })
        }

        if (type === "row") {
          const changes = {
            id: mongoose.Types.ObjectId(),
          }
          Object.entries(data).forEach((pair) => {
            changes[pair[0]] = pair[1]
          })

          Excel.findOneAndUpdate(
            { _id: file._id },
            {
              $push: { [`sheets.${sheetname}`]: changes },
            },
            { new: true },
            (err, result) => {
              if (err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  success: false,
                  err: err.message,
                })
              }
              if (!result) {
                return res.status(StatusCodes.NOT_FOUND).json({
                  success: false,
                  err: "File not found...",
                })
              }

              let sheet = result.sheets[sheetname]

              const columnsSet = new Set(
                [].concat(
                  ...sheet.map((row) => {
                    return [...Object.keys(row)]
                  })
                )
              )
              sheet.push({
                id: "insertId",
                rows: "insert",
              })

              const columns = Array.from(columnsSet)
                .map((column) => {
                  if (column !== "id") {
                    return {
                      field: column,
                      headerName: column[0].toUpperCase() + column.substring(1),
                      sortable: false,
                      align: "center",
                      editable: true,
                    }
                  }
                })
                .filter(Boolean)

              return res.status(StatusCodes.OK).json({
                success: true,
                pages: {
                  pagesnames: Object.keys(result.sheets),
                  pagescount: Object.keys(result.sheets).length,
                },
                sheet,
                sheetname: sheetname,
                columns,
              })
            }
          )
        } else if (type === "column") {
          console.log(data)
        }
      })
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: true,
        err: `Data not valid...`,
      })
    }
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
  patchSheet,
}
