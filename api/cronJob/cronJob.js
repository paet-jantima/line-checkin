const cron = require('node-cron');
const User = require('./../models/User.js');
require('moment-timezone');
const { checkAndUpdateStatus } = require('./../controllers/time.controller.js');

const startCronJob = () => {
    cron.schedule('0 0 1 * *', async () => {
        try {
            await User.updateMany({}, { $set: { absentDays: 0, lateDays: 0 } });
            console.log('อัพเดตคะแนนเรียบร้อยแล้ว');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัพเดตคะแนน:', error);
        }
    });
};

const startCheck = () => {
    cron.schedule('*/5 * * * *', async () => {
        try {
            checkAndUpdateStatus();
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
        }
    });
};

module.exports = { startCronJob, startCheck };
