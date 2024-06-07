import express from "express";
const router = express.Router();

import {getMyInfo} from "../controllers/user.controller.js"


router.get('/me',getMyInfo)
export default router