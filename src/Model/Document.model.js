const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  docType: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isShared: {
    type: Boolean,
    default: false,
  },
  dateShared: {
    type: Date,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("documents", Schema);
