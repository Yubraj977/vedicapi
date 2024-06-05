import express from 'express'
import upload from '../middlewares/multer.middleware.js'


import {getAllProducts,SingleProductDetial,createProduct,updateProduct,deleteProduct} from '../controllers/product.controller.js'
const router =express.Router()
router.get('/allproducts',getAllProducts)
router.get('/:id',SingleProductDetial)
router.post('/create',upload.single('image'),createProduct)
router.put('/update/:id',upload.single('image'),updateProduct)
router.delete('/delete/:id',deleteProduct)
export default router