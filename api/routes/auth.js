const express = require("express");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

// Destructure controller functions
const { checkUserById, login, loginLine, register, registerAdmin } = authController;

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Login with Line
router.post("/loginline", loginLine);

// Register as admin
router.post("/register-admin", registerAdmin);



module.exports = router;
