import moment from 'moment';
import 'moment-timezone';
import Time from '../models/Time.js'; 
import User from '../models/User.js';


export const recordCheckIn = async (req, res, next) => {
    const { userId } = req.body;
    
    try {
      const todayStart = moment().startOf('day'); // หาเวลาเริ่มต้นของวันนี้
      const todayEnd = moment().endOf('day'); // หาเวลาสิ้นสุดของวันนี้
  
      // ตรวจสอบว่ามีการบันทึกเวลาเข้างานของ userId ในช่วงเวลาของวันนี้หรือไม่
      const existingCheckIn = await Time.findOne({
        userId,
        checkin: { $gte: todayStart, $lte: todayEnd }
      });
  
      if (existingCheckIn) {
        // ถ้ามีการบันทึกเวลาเข้างานแล้วในวันนี้
        return res.status(400).json({ error: 'คุณได้ทำการเช็คอินไปแล้วในวันนี้' });
      }
  
      // ถ้ายังไม่มีการบันทึกเวลาเข้างานในวันนี้ ทำการบันทึก
      const currentTime = new Time({ userId }); 
      await currentTime.save();
      console.log('บันทึกเวลาการเข้างานสำเร็จ');
      res.status(200).json({ message: 'บันทึกเวลาการเข้างานสำเร็จ' });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกเวลา:', error);
      res.status(500).json({ error: 'มีข้อผิดพลาดในการบันทึกเวลา' });
    }
  };

export const recordCheckOut = async (req, res, next) => {
    const { userId } = req.body;
    
    try {
      const todayStart = moment().startOf('day'); // หาเวลาเริ่มต้นของวันนี้
      const todayEnd = moment().endOf('day'); // หาเวลาสิ้นสุดของวันนี้
  
      // ตรวจสอบว่ามีการบันทึกเวลาเข้างานของ userId ในช่วงเวลาของวันนี้หรือไม่
      const existingCheckIn = await Time.findOne({
        userId,
        checkin: { $gte: todayStart, $lte: todayEnd }
      });
  
      if (existingCheckIn) {
        if (existingCheckIn.checkout) {
          return res.status(400).json({ error: 'คุณได้ทำการเช็คเอาท์ไปแล้วในวันนี้' });
        } else {
          // ทำการบันทึก checkout ของผู้ใช้งาน
          existingCheckIn.checkout = moment(); // กำหนดค่า checkout เป็นเวลาปัจจุบัน
          await existingCheckIn.save();
          console.log('บันทึกเวลาการเช็คเอาท์สำเร็จ');
          return res.status(200).json({ message: 'บันทึกเวลาการเช็คเอาท์สำเร็จ' });
        }
      }
  
      // ถ้ายังไม่มีการบันทึกเวลาเข้างานในวันนี้ จะไม่สามารถทำการ checkout ได้
      return res.status(400).json({ error: 'คุณยังไม่ได้ทำการเช็คอินในวันนี้' });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกเวลา:', error);
      res.status(500).json({ error: 'มีข้อผิดพลาดในการบันทึกเวลา' });
    }
  };

  // ดึงรายการบันทึกเวลาทั้งหมด
export const getAllTimeRecords = async (req, res, next) => {
    try {
      const allTimeRecords = await Time.find({});
      res.status(200).json(allTimeRecords);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      res.status(500).json({ error: 'มีข้อผิดพลาดในการดึงข้อมูล' });
    }
  };
  
  // ดึงรายการบันทึกเวลาของตัวเองเท่านั้น (โดยใช้ userId จาก req.body หรือ req.params)
  export const getMyTimeRecords = async (req, res, next) => {
    const { userId } = req.body; // ใช้ req.params ในการรับ userId
  
    try {
      // ตรวจสอบว่า userId ที่รับมามีอยู่ในระบบหรือไม่
      const userExists = await User.exists(  { userId: userId });
    
  
      if (!userExists) {
        return res.status(404).json({ error: 'ผู้ใช้งานไม่มีอยู่ในระบบ' });
      }
  
      // หากผู้ใช้มีอยู่ในระบบ ดึงข้อมูลการทำงานของผู้ใช้นั้นออกมา
      const myTimeRecords = await Time.find({ userId });
      res.status(200).json(myTimeRecords);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลของตัวเอง:', error);
      res.status(500).json({ error: 'มีข้อผิดพลาดในการดึงข้อมูลของตัวเอง' });
    }
  };

  export const editTimeRecord = async (req, res, next) => {
    const { recordId, checkin, checkout } = req.body; // รับค่า recordId, checkin และ checkout จาก req.body
  
    try {
      // ตรวจสอบว่า recordId ที่รับมามีอยู่ในฐานข้อมูลหรือไม่
      const recordExists = await Time.exists({ _id: recordId });
  
      if (!recordExists) {
        return res.status(404).json({ error: 'ไม่พบบันทึกเวลาที่ต้องการแก้ไข' });
      }
  
      // หาก recordId มีอยู่ในฐานข้อมูล ทำการอัปเดตเฉพาะข้อมูลที่ถูกส่งมาใหม่
      const updatedFields = {};
      if (checkin) updatedFields.checkin = checkin;
      if (checkout) updatedFields.checkout = checkout;
  
      const updatedRecord = await Time.findByIdAndUpdate(
        recordId,
        updatedFields,
        { new: true }
      );
  
      res.status(200).json({ message: 'แก้ไขข้อมูลเวลาสำเร็จ', updatedRecord });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการแก้ไขข้อมูลเวลา:', error);
      res.status(500).json({ error: 'มีข้อผิดพลาดในการแก้ไขข้อมูลเวลา' });
    }
  };
  