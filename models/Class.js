const mongoose = require("mongoose")

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A class must have a name."],
    },
    status: {
      type: String,
      required: [true, "Please provide a status for the class."],
      enum: {
        values: ["Active", "Inactive"],
        message: ["{VALUE} is not a valid status."],
      },
    },
    teacher: {
      type: mongoose.ObjectId,
      required: [true, "A class must have a teacher."],
    },
    students: {
      type: Array,
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "A class must have at least one student.",
      ],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("classes", ClassSchema)
