import express from "express";
const router = express.Router();
import { checkAuth } from "../middlewares/jwt.middleware.js";
import {getMyInfo} from "../controllers/user.controller.js"


router.post('/me',checkAuth,getMyInfo)
export default router