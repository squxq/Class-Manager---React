const mongoose = require("mongoose")

const EventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please enter a title."],
    },
    start: {
      type: String,
      required: [true, "Please enter a start date."],
    },
    end: {
      type: String,
      required: [true, "Please enter a end date."],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Events", EventSchema)
