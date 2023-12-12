import cron from 'node-cron';
import User from './../models/User.js'; 
import 'moment-timezone';
import { checkAndUpdateStatus } from './../controllers/time.controller.js'



export const startCronJob = () => {
    // สร้าง cron job เพื่อทำงานทุกวันที่ 1 เวลา 00:00
    cron.schedule('0 0 1 * *', async () => {
        try {
            // อัพเดตคะแนนของผู้ใช้ทั้งหมดเป็น 0
            await User.updateMany({}, { $set: { absentDays: 0, lateDays: 0 } });
            console.log('อัพเดตคะแนนเรียบร้อยแล้ว');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัพเดตคะแนน:', error);
        }
    });
};

export const startCheck = () => {
    // สร้าง cron job เพื่อทำงานทุกวันก่อนที่จะขึ้นวันใหม่ เวลา 00:00
    cron.schedule('0 0 0 * * *', async () => {
        try {
            checkAndUpdateStatus();
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
        }
    });
};




  
  
  
