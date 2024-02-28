const express = require('express');
const userController = require('../controllers/user.controller.js');
const { verifyAdmin, verifyUser } = require('../utils/verifyToken.js');

const router = express.Router();

// Destructure controller functions
const { deleteUserById, getAllUsers, getById, updateUserById } = userController;

// Get all users
router.get('/', /*verifyAdmin,*/ getAllUsers); // verifyAdmin

// Get user by ID
router.get('/:id', /*verifyUser,*/ getById); // verifyUser

// Update user by ID
router.put('/update/:id',/*verifyUser,*/ updateUserById);

// Delete user by ID
router.delete('/delete/:id',/*verifyAdmin,*/ deleteUserById);

module.exports = router;

