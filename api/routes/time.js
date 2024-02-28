const express = require('express');
const timeController = require('../controllers/time.controller.js');

const router = express.Router();

// Destructure controller functions
const { editTimeRecord, getAllTimeRecords, getMyTimeRecords, recordCheckIn, recordCheckOut } = timeController;
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

router.post('/checkin/:id', /*verifyUser,*/ recordCheckIn);
router.post('/checkout/:id', /*verifyUser,*/ recordCheckOut);
router.get('/getall',/*verifyAdmin,*/ getAllTimeRecords);
router.post('/edit/:id',/*verifyAdmin,*/ editTimeRecord);
router.get('/getmytime/:id',/*verifyUser,*/ getMyTimeRecords);

module.exports = router;
