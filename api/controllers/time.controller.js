const moment = require('moment');
require('moment-timezone');
const Time = require('../models/Time.js');
const User = require('../models/User.js');
const { DateTime } = require('luxon');

const recordCheckIn = async (req, res, next) =>{
  const { userId } = req.body;

  try {
      const thaiTime = moment().tz('Asia/Bangkok');
      
      const checkInTime = thaiTime.hours() * 60 + thaiTime.minutes();
      const lateThreshold = 9 * 60 + 20;

      const status = checkInTime > lateThreshold ? 'มาสาย' : 'ปกติ';

      const formattedTime = moment().format('YYYY-MM-DD HH:mm:ss')

      const todayStart = thaiTime.clone().startOf('day');
      const todayEnd = thaiTime.clone().endOf('day');

      const existingUser = await User.findOne({ _id: userId });

      if (!existingUser) {
          return res.status(400).json({ error: 'ไม่พบผู้ใช้งานในระบบ' });
      }

      const existingCheckIn = await Time.findOne({
          userId,
          createdAt: { $gte: todayStart, $lte: todayEnd },
          checkin:  { $exists: true },
            checkout: { $exists: false } 
      });

      


      if (existingCheckIn && existingCheckIn.checkout) {
          return res.status(400).json({ error: 'คุณได้ทำการเช็คอินและเช็คเอาท์ไปแล้วในวันนี้' });
      }

      if (existingCheckIn && !existingCheckIn.checkout) {
          return res.status(400).json({ error: 'คุณได้ทำการเช็คอินไปแล้วในวันนี้' });
      }

      if (!existingCheckIn && existingCheckIn.checkout) {
        return res.status(400).json({ error: 'คุณได้ทำการเช็คอินไปแล้วในวันนี้' });
    }

      const currentTime = new Time({ userId: existingUser._id, checkin: formattedTime, status });
      await currentTime.save();

      if (status === 'มาสาย') {
          existingUser.lateDays = (existingUser.lateDays || 0) + 1;
          await existingUser.save();
      }

      console.log('บันทึกเวลาการเข้างานสำเร็จ');
      res.status(200).json({ message: 'บันทึกเวลาการเข้างานสำเร็จ' });
  } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกเวลา:', error);
      res.status(500).json({ error: 'มีข้อผิดพลาดในการบันทึกเวลา' });
  }
};




const recordCheckOut = async (req, res, next) => {
  const { userId } = req.body;

  try {
      const todayStart = moment().startOf('day');
      const todayEnd = moment().endOf('day');

      const existingUser = await User.findOne({ _id: userId });

      if (!existingUser) {
          return res.status(400).json({ error: 'ไม่พบผู้ใช้งานในระบบ' });
      }

      const existingCheckOut = await Time.findOne({
          userId,
          createdAt: { $gte: todayStart, $lte: todayEnd },
          checkout: { $exists: true }
      });

      if (!existingCheckOut) {
          const existingCheckIn = await Time.findOne({
              userId,
              createdAt: { $gte: todayStart, $lte: todayEnd },
              checkin: { $exists: true }
          });

          if (!existingCheckIn) {
              const newCheckIn = new Time({
                  userId: existingUser._id,
                  status: 'ไม่ได้เช็คอิน',
                  checkout: moment().format('YYYY-MM-DD HH:mm:ss')
              });
              await newCheckIn.save();
              console.log('สร้างข้อมูลเช็คอินใหม่สำหรับวันนี้แล้ว');
          } else {
              existingCheckIn.checkout = moment().format('YYYY-MM-DD HH:mm:ss');
              await existingCheckIn.save();
              console.log('บันทึกเวลาการเช็คเอาท์สำเร็จ');
          }

          return res.status(200).json({ message: 'บันทึกเวลาการเช็คเอาท์สำเร็จ' });
      } else {
          return res.status(400).json({ error: 'คุณได้ทำการเช็คเอาท์ไปแล้วในวันนี้' });
      }
  } catch (error) {
      console.error('เกิดข้อผิดพลาดในการบันทึกเวลา:', error);
      return res.status(500).json({ error: 'มีข้อผิดพลาดในการบันทึกเวลา' });
  }
};


const getAllTimeRecords = async (req, res, next) => {
  try {
    const allTimeRecords = await Time.find({});
    res.status(200).json(allTimeRecords);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    res.status(500).json({ error: 'มีข้อผิดพลาดในการดึงข้อมูล' });
  }
};

const getMyTimeRecords = async (req, res, next) => {
  const userId = req.params.id; // Access userId from req.params

  try {
    // Check if the user with the received userId exists in the system
    const userExists = await User.exists({ _id: userId });

    if (!userExists) {
      return res.status(404).json({ error: 'ผู้ใช้งานไม่มีอยู่ในระบบ' });
    }

    // If the user exists, fetch their time records
    const myTimeRecords = await Time.find({ userId });
    res.status(200).json(myTimeRecords);
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลของตัวเอง:', error);
    res.status(500).json({ error: 'มีข้อผิดพลาดในการดึงข้อมูลของตัวเอง' });
  }
};

  
   const editTimeRecord = async (req, res, next) => {
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
  
 const checkAndUpdateStatus = async () => {
    try {
      const thaiTime = moment().tz('Asia/Bangkok');
      const todayStart = thaiTime.clone().startOf('day');
      const todayEnd = thaiTime.clone().endOf('day');
  
      const allUsers = await User.find();
  
      for (const user of allUsers) {
        const existingCheckIn = await Time.findOne({
          userId: user._id,
          createdAt: { $gte: todayStart, $lte: todayEnd }
        });
  
        if (!existingCheckIn) {
          // ถ้าไม่มีข้อมูลสำหรับวันนี้ ให้สร้างข้อมูลใหม่
          const newCheckIn = new Time({
            userId: user._id,
            createdAt: thaiTime.toDate(),
            status: 'ขาดงาน'
          });
          await newCheckIn.save();
  
          user.absentDays = (user.absentDays || 0) + 1; // เพิ่มจำนวนวันขาดงาน
          await user.save();
  
          console.log('สร้างข้อมูลเวลาใหม่สำหรับวันนี้แล้ว');
        }  else if (!existingCheckIn.checkout && existingCheckIn.status !== 'ขาดงาน' && existingCheckIn.status !== 'วันหยุด') {
          // ถ้ามีเพียงเช็คอินเท่านั้น และสถานะไม่ใช่ "ขาดงาน" หรือ "วันหยุด" ให้เช็คเอ้าท์ที่ 18:00 (UTC+0)
          existingCheckIn.checkout = thaiTime.clone().utc().set({ hour: 18, minute: 0, second: 0 }).format('YYYY-MM-DD HH:mm:ss');
          await existingCheckIn.save();
          console.log('เช็คเอาท์ใหม่เพื่อผู้ใช้งาน');
        } 
      }
  
      console.log('ตรวจสอบและปรับสถานะเรียบร้อย');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการตรวจสอบและปรับสถานะ:', error);
    }
  };
  
  module.exports = {
    recordCheckIn,
    recordCheckOut,
    getAllTimeRecords,
    getMyTimeRecords,
    editTimeRecord,
    checkAndUpdateStatus
};