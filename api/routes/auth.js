import express from "express";
import { checkUserById, login, loginLine, register, registerAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

//register

router.post("/register",register)

//login
router.post("/login",login)

//loginline
router.post("/loginline",loginLine)

//register as admin
router.post("/register-admin",registerAdmin);

//send reset email




router.post("/checkUserById",checkUserById)

export default router;