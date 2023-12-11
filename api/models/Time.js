import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema({
  userId: {
      type: String,
      required: true
  },
  checkin: {
      type: Date // แก้จาก type: String เป็น type: Date
  },
  checkout: {
      type: Date // แก้จาก type: String เป็น type: Date
  },
  status: {
      type: String
  }
}, { timestamps: true });

export default mongoose.model("Time", TimeSchema);
