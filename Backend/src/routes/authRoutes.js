import express from "express"
import {loginUser, registerUser, forgotPassword, logout} from "../controllers/authController.js"

const router = express.Router();

// Register User
router.post("/register", registerUser)

// Login User
router.post("/login", loginUser)

// Forgot Passowrd
router.post("/forgot-password", forgotPassword)

// Log out
router.post("/logout", logout)

export default router;