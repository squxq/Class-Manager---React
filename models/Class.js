const mongoose = require("mongoose")

const ClassSchema = new mongoose.Schema(
  {
    grade: {
      type: Number,
      required: [true, "A class must have a grade."],
    },
    letter: {
      type: String,
      required: [true, "A class must have a letter."],
    },
    teachers: {
      type: Array,
      required: [true, "A class must have at least one teacher."],
    },
    students: {
      type: Array,
      required: [true, "A class must have at least one student."],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("classes", ClassSchema)
