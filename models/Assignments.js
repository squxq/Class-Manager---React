const mongoose = require(`mongoose`)

const AssignmentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "An assignment must have a valid name."],
    },
    start: {
      type: String,
      required: [true, "An assignment must have a starting date."],
    },
    end: {
      type: String,
      required: [true, "An assignment must have a ending date."],
    },
    instructions: {
      type: String,
      required: [true, "An assignment must have some instructions."],
    },
    status: {
      type: String,
      required: [true, "An assignment needs a status."],
      enum: {
        values: ["Pending", "Completed"],
        message: "{VALUE} is not a valid assignment status.",
      },
    },
    teacher: {
      type: mongoose.ObjectId,
      required: [true, "An assignment must have a teacher."],
    },
    class: {
      type: mongoose.ObjectId,
      required: [true, "An assignment must be assigned to a class."],
    },
    students: {
      // refers to the students that answered the assignment
      type: Array,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model(`assignments`, AssignmentsSchema)
