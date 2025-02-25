const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    sessionTimings: {
      type: String,
      required: true,
    },
    speakers: {
      type: [String],
      required: true,
    },
    pricing: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    additionalInfo: {
      type: String,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
