import express from "express";
import { googleLogin,signup,lgoin,logout,stillLogin } from "../controllers/auth.controller.js";
const router = express.Router();

router.post('/signup',signup)
router.post('/login',lgoin)
router.post('/googlelogin',googleLogin)
router.post('/logout',logout)
router.post('/stillogin',stillLogin)

export default router