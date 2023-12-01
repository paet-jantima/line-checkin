import express from 'express';
import { deleteUserById, getAllUsers, getById, updateUserById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();
//get all
router.get('/',getAllUsers); //verifyAdmin,
//get by id
router.get('/:id',getById); //verifyUser,

// Update user by ID
router.put('/update/:id', updateUserById);

// Delete user by ID
router.delete('/delete/:id', deleteUserById);

export default router;