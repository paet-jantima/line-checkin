const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true
  },
  checkin: {
      type: Date
  },
  checkout: {
      type: Date
  },
  status: {
      type: String
  }
}, { timestamps: true });

module.exports = mongoose.model("Time", TimeSchema);
