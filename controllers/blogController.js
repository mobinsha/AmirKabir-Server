const blogModel = require("../models/blogModel");
const { sendResponse } = require('../utils/responseHandler');

async function addBlog (req, res, next) {
    const {title, content} = req.body;
    const author_id = req.user.id
    try {
        await blogModel.findByTitle(title);
        const newBlog = await blogModel.addBlog(title, content, author_id)
        // there is some bug to send response to client and i have to fix it
        sendResponse(res, 201, 'مقاله شما با موفقیت ثبت شد.', newBlog);
    } catch (err) {
        next(err);
    }
}


async function getAllBlogs(req, res, next) {
    try {
        const blogs = await blogModel.getAllBlogs();
        sendResponse(res, 200, 'Success', blogs);
    } catch (err) {
        next(err);
    }
}


async function deleteBlog(req, res, next) {
    const deleteBlogId = req.params.id;
    try {
        await blogModel.deleteBlog(deleteBlogId);
        sendResponse(res, 200, 'مقاله مورد نظر با موفقیت حذف شد.');
    } catch (err) {
        next(err);
    }
}

async function getBlogById(req, res, next) {
    const blogId = req.params.id;

    try {
        const blog = await blogModel.getBlogById(blogId);
        sendResponse(res, 200, 'Success', blog);
    } catch (err) {
        next(err);
    }
}


async function updateBlog(req, res, next) {
    const blogId = req.params.id;
    const blogData = req.body;

    try {
        await blogModel.updateBlogs(blogId, blogData);
        sendResponse(res, 200, 'وبلاگ با موفیقت بروزرسانی شد');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addBlog,
    getAllBlogs,
    deleteBlog,
    getBlogById,
    updateBlog
}





