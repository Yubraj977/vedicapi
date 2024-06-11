import express from 'express'
const router =express.Router()
import { singleProductReview,AllProductReview,myReviews,createReview,editReview,deleteReview } from '../controllers/review.controller.js'
import { checkAuth } from '../middlewares/jwt.middleware.js'

router.get('/singleproduct',singleProductReview)
router.get('/allproducts',AllProductReview)
router.get('/mine',myReviews)
router.post('/create',checkAuth,createReview)
router.put('/edit',checkAuth,editReview)
router.delete('/delete',checkAuth,deleteReview)

export default router