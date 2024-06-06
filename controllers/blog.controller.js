
import blogModel from '../models/blog.model.js'
import { errorHandler } from '../helpers/Error.js'
export async function getAllBlogs(req, res, next) {
    const blogs = await blogModel.find();
    if (!blogs) {
        return next(errorHandler(404, 'blogs not found'))
    }
    res.status(200).json({
        success: "true",
        message: "blogs fetched successfully",
        blogs
    })
}


export async function signleBlogDetial(req, res, next) {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
        return next(errorHandler(404, 'blog not found'))
    }
    res.status(200).json({
        success: "true",
        message: "blog fetched successfully",
        blog
    })

}


export async function createBlog(req, res, next) {
    const { title, image, content } = req.body;
    if (!title || !image || !content) {
        return next(errorHandler(400, 'please provide all the fields'))
    }
    const myArticle = new blogModel({ title, image, content });
    await myArticle.save();

    res.status(200).json({
        sucess: "true",
        message: "blog created successfully",
        myArticle
    })

}






export async function updateBlog(req, res, next) {
    const { title, image, content } = req.body;
    if (!title || !image || !content) {
        return next(errorHandler(400, 'please provide all the fields'))
    }
    const article = await blogModel.findById(req.params.id);
    if (!article) {
        return next(errorHandler(404, 'article not found'))
    }
    article.title=title;
    article.image=image;
    article.content=content;
    await article.save();
    res.status(200).json({
        success: "true",
        message: "article updated successfully",
        article
    })

}

export async function deleteBlog(req, res, next) {
const article = await blogModel.findByIdAndDelete(req.params.id);
if (!article) {
    return next(errorHandler(404, 'article not found'))
}
res.status(200).json({
    success: "true",
    message: "article deleted successfully",
    article
})

}

