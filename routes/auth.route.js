import express from "express";
import { googleLogin,signup,lgoin } from "../controllers/auth.controller.js";
const router = express.Router();

router.post('/signup',signup)
router.post('/login',lgoin)
router.post('/googlelogin',googleLogin)

export default router