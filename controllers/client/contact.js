const contactModel = require('../../models/contact');
const { sendResponse } = require('../../utils/responseHandler');

async function addComment(req, res, next) {
    const {name, email, phoneNumber, subject, message} = req.body;
    try {
        await contactModel.addComment({name, email, phoneNumber, subject, message});
        sendResponse(res, 201, 'نظر شما با موفیقت ثبت شد');
    } catch (err) {
        next(err);
    }
}

async function getAllComments(req, res, next) {
    try {
        const comments = await contactModel.getAllComments();
        sendResponse(res, 200, 'Success', comments);
    } catch (err) {
        next(err);
    }
}

async function getCommentById(req, res, next) {
    const commentId = req.params.id;
    try {
        const comment = await contactModel.getCommentById(commentId);
        sendResponse(res, 200, 'Success', comment);
    } catch (err) {
        next(err);
    }
}

async function deleteComment(req, res, next) {
    const commentId = req.params.id;
    try {
        await contactModel.deleteComment(commentId);
        sendResponse(res, 200, 'نظر با موفقیت حذف شد');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addComment,
    getAllComments,
    getCommentById,
    deleteComment
}