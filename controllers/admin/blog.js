const blogModel = require("../../models/blog");
const {sendResponse} = require("../../utils/responseHandler");
const {generateUUID} = require("../../utils/uuid");

async function deleteBlog(req, res, next) {
    const deleteBlogId = req.params.id;
    try {
        await blogModel.deleteBlog(deleteBlogId);
        sendResponse(res, 200, 'مقاله مورد نظر با موفقیت حذف شد.');
    } catch (err) {
        next(err);
    }
}

async function addBlog (req, res, next) {
    const newUuid = generateUUID();
    const {title, content} = req.body;
    const author_id = req.user.id
    try {
        const newBlog = await blogModel.addBlog({
            keyCore : newUuid,
            title,
            content,
            author_id
        })
        // there is some bug to send response to client and im have to fix it
        sendResponse(res, 201, 'مقاله شما با موفقیت ثبت شد.', newBlog);
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
    deleteBlog,
    addBlog,
    updateBlog
}
