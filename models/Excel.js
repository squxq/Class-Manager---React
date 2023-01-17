const mongoose = require("mongoose")

const ExcelSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: [true, "Each file must have a name."],
    },
    fileCreatedDate: {
      type: String,
      required: [true, "A Excel file must have a created date."],
    },
    sheets: {
      type: Object,
      required: [true, "A Excel file must have at least one sheet."],
    },
    teacher: {
      type: mongoose.ObjectId,
      required: [true, "A teacher must be assigned to a file"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("ExcelFiles", ExcelSchema)
