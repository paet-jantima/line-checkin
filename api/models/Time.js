import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true // ระบุให้ userId เป็นข้อมูลที่ต้องระบุ
    },
    checkin: {
      type: Date,
      default: Date.now // ใช้ Date.now เป็นค่าเริ่มต้นของ checkin
    },
    checkout: {
      type: Date
    }
  });

  export default mongoose.model("Time",TimeSchema);