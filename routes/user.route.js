import express from "express";
const router = express.Router();
import { checkAuth } from "../middlewares/jwt.middleware.js";
import {getMyInfo,updateMyInfo} from "../controllers/user.controller.js"


router.post('/me',checkAuth,getMyInfo)
router.post('/update',checkAuth,updateMyInfo)
export default router