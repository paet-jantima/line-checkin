const express = require('express');
const userController = require('../controllers/user.controller.js');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

// Destructure controller functions
const { deleteUserById, getAllUsers, getById, updateUserById } = userController;

// Get all users
router.get('/', getAllUsers); // verifyAdmin,

// Get user by ID
router.get('/:id', getById); // verifyUser,

// Update user by ID
router.put('/update/:id', updateUserById);

// Delete user by ID
router.delete('/delete/:id', deleteUserById);

module.exports = router;
