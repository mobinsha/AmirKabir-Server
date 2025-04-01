const blogModel = require("../../models/blog");
const { sendResponse } = require('../../utils/responseHandler');

async function getAllBlogs(req, res, next) {
    try {
        const blogs = await blogModel.getAllBlogs();
        sendResponse(res, 200, 'Success', blogs);
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


module.exports = {
    getAllBlogs,
    getBlogById
}





