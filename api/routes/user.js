import express from 'express';
import { getAllUsers, getById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();
//get all
router.get('/',getAllUsers); //verifyAdmin,
//get by id
router.get('/:id',getById); //verifyUser,

export default router;