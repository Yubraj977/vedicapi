import express from "express";

import {getAllBlogs ,signleBlogDetial,updateBlog,createBlog,deleteBlog} from '../controllers/blog.controller.js'

const router = express.Router();
router.get('/allblogs',getAllBlogs)
router.get('/:id',signleBlogDetial)
router.post('/create',createBlog)
router.put('/update/:id',updateBlog)
router.delete('/delete/:id',deleteBlog)

export default router