import express from "express";
import { googleLogin,signup,lgoin,logout,stillLogin,resetPassword } from "../controllers/auth.controller.js";
const router = express.Router();

router.post('/signup',signup)
router.post('/login',lgoin)
router.post('/googlelogin',googleLogin)
router.get('/logout',logout)
router.post('/stillogin',stillLogin)
router.post('/resetPassword',resetPassword)

export default router