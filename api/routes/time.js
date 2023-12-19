const express = require('express');
const timeController = require('../controllers/time.controller.js');

const router = express.Router();

// Destructure controller functions
const { editTimeRecord, getAllTimeRecords, getMyTimeRecords, recordCheckIn, recordCheckOut } = timeController;

router.post('/checkin', recordCheckIn);
router.post('/checkout', recordCheckOut);
router.get('/getall', getAllTimeRecords);
router.post('/edit', editTimeRecord);
router.get('/getmytime/:id', getMyTimeRecords);

module.exports = router;
