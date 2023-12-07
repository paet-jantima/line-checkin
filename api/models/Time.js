import mongoose from "mongoose";

const TimeSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true // ระบุให้ userId เป็นข้อมูลที่ต้องระบุ
    },
    checkin: {
      type: Date
      
    },
    checkout: {
      type: Date
    }
  });

  export default mongoose.model("Time",TimeSchema);