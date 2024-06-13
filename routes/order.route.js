import express from 'express'
const router =express.Router()
import { checkAuth } from '../middlewares/jwt.middleware.js'
import { createOrder,myOrders } from '../controllers/order.controller.js'
router.post('/create',checkAuth,createOrder)
router.get('/myorders',checkAuth,myOrders)

export default router