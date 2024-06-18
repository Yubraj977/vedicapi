import express from 'express'
import userModel from '../models/user.model.js'
const router =express.Router()
import { checkAuth } from '../middlewares/jwt.middleware.js'
import { processPayment,sendStripeApiKey } from '../controllers/payment.controller.js'
router.post('/create',checkAuth,processPayment)
router.get('/stripeapikey',sendStripeApiKey)
export default router