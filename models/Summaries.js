const mongoose = require(`mongoose`)

const SummariesSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: [true, "A summary must have a number."],
    },
    state: {
      type: String,
      required: [true, "A summary must have a state"],
      enum: {
        values: ["Finished", "Pending"],
        message: ["{VALUE} is not a valid summary state."],
      },
    },
    content: {
      type: String,
      required: [true, "A summary must have content"],
    },
    teacher: {
      type: mongoose.ObjectId,
      required: [true, "A summary must have been created by a teacher."],
    },
    class: {
      type: mongoose.ObjectId,
      required: [true, "A summary must have a class."],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("summaries", SummariesSchema)
