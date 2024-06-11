import express from 'express'
const router =express.Router()
import { singleProductReview,AllProductReview,myReviews,createReview,editReviw,deleteReview } from '../controllers/review.controller'


router.get('/singleproduct',singleProductReview)
router.get('/allproducts',AllProductReview)
router.get('/mine',myReviews)
router.post('/create',createReview)
router.put('/edit',editReviw)
router.delete('/delete',deleteReview)

export default router