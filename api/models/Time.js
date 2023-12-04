import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true // ระบุให้ userId เป็นข้อมูลที่ต้องระบุ
    },
    checkin: {
      type: Date,
      default: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Bangkok' })) // Set default as current date and time in Thailand timezone
    },
    checkout: {
      type: Date
    }
  });

  export default mongoose.model("Time",TimeSchema);