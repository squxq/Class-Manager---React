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
    reference: {
      // refers to the reference work teachers can add to their assignments
      type: Array,
    },
    classes: {
      type: Array,
      required: [true, "An assignment must be assigned to a class."],
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
  },
  { timestamps: true }
)

module.exports = mongoose.model(`assignments`, AssignmentsSchema)
