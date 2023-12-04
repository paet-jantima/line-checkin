import moment from 'moment';
import 'moment-timezone';
import Time from '../models/Time.js'; 
import User from '../models/User.js';
import { DateTime } from 'luxon';



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

  export const getAllTimeRecords = async (req, res, next) => {
    try {
      const allTimeRecords = await Time.find({});
      const recordsInThailandTime = allTimeRecords.map(record => {
        // Convert UTC timestamp to Thailand timezone using Luxon
        const checkinThailandTime = DateTime.fromJSDate(record.checkin, { zone: 'utc' }).setZone('Asia/Bangkok');
        const checkoutThailandTime = record.checkout ? DateTime.fromJSDate(record.checkout, { zone: 'utc' }).setZone('Asia/Bangkok') : null;
  
        return {
          userId: record.userId,
          checkin: checkinThailandTime.toJSDate(),
          checkout: checkoutThailandTime ? checkoutThailandTime.toJSDate() : null
        };
      });
  
      res.status(200).json(recordsInThailandTime);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
      res.status(500).json({ error: 'มีข้อผิดพลาดในการดึงข้อมูล' });
    }
  };
  
  
  export const getMyTimeRecords = async (req, res, next) => {
    const userId = req.params.id; // Access userId from req.params
  
    try {
      // Check if the user with the received userId exists in the system
      const userExists = await User.exists({ _id: userId });
  
      if (!userExists) {
        return res.status(404).json({ error: 'ผู้ใช้งานไม่มีอยู่ในระบบ' });
      }
  
      // If the user exists, fetch their time records
      const myTimeRecords = await Time.find({ userId });
  
      // Convert UTC timestamps to Thailand timezone (+07:00)
      const recordsInThailandTime = myTimeRecords.map(record => {
        const adjustedCheckin = new Date(record.checkin).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
        const adjustedCheckout = record.checkout ? new Date(record.checkout).toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }) : null;
  
        return {
          userId: record.userId,
          checkin: adjustedCheckin,
          checkout: adjustedCheckout,
        };
      });
  
      res.status(200).json(recordsInThailandTime);
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
  