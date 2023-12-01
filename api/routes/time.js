import express from 'express';
import {editTimeRecord, getAllTimeRecords, getMyTimeRecords, recordCheckIn, recordCheckOut}from'../controllers/time.controller.js';

const router = express.Router();

router.post('/checkin',recordCheckIn)

router.post('/checkout',recordCheckOut)

router.get('/gettime',getAllTimeRecords)

router.post('/edit',editTimeRecord)

router.get('/getmytime',getMyTimeRecords)



export default router;