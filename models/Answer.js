const mongoose = require("mongoose")

const AnswerSchema = new mongoose.Schema(
  {
    assignment: {
      type: mongoose.ObjectId,
      required: [true, "An assignment is required for an answer."],
    },
    student: {
      type: mongoose.ObjectId,
      required: [true, "An answer must have been given by a student."],
    },
    content: {
      type: Array,
      //   required: [true, "please provide valid content."],
    },
    grade: {
      type: Number,
      required: [true, "Please provide a grade for the student's answer."],
      default: 0,
    },
    feedback: {
      type: String,
      required: [true, "Please provide feedback for the student's answer."],
      default: "Assignment delivered successfully.",
    },
    deliveryDate: {
      type: String,
      required: [
        true,
        "Please provide a delivery date for the student's answer.",
      ],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model(`answers`, AnswerSchema)
