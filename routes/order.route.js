import express from 'express'
import userModel from '../models/user.model.js'
const router =express.Router()
import { checkAuth } from '../middlewares/jwt.middleware.js'
import { createOrder,myOrders,getSingleOrder,updateOrder,deleteOrder } from '../controllers/order.controller.js'

// For the normal player
router.post('/create',checkAuth,createOrder)
router.get('/myorders',checkAuth,myOrders)
router.delete('/delete',checkAuth,deleteOrder)

// For the admin
router.get('/searchorder',checkAuth,getSingleOrder)
router.put('/update',checkAuth,updateOrder)


export default router