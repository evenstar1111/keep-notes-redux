const { Schema, model } = require("mongoose");

const notesSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      max: 50,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    status: {
      type: String,
      required: true,
      trim: true,
      max: 10,
      default: "New",
    },

    label: {
      type: String,
      trim: true,
      max: 10,
    },

    created: {
      type: String,
      required: true,
    },

    user: {
      type: String,
      required: true,
    },
  },
  {
    bufferCommands: false,
  }
);

module.exports = model("Notes", notesSchema);
