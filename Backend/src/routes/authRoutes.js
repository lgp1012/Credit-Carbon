import express from "express"
import {loginUser, registerUser} from "../controllers/authController.js"

const router = express.Router();

// Register User
router.post("/register", registerUser)

// Login User
router.post("/login", loginUser)

// Forgot Passowrd

export default router;