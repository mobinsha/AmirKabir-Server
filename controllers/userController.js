const userModel = require("../models/userModel");
const { sendResponse } = require('../utils/responseHandler');
const {comparePassword} = require('../utils/comparePassword')
const jwt = require('jsonwebtoken')



async function addUser(req, res, next) {
    const {userName, password, permission} = req.body;
    try {
        await userModel.addUser(userName, password, permission);
        sendResponse(res, 201, 'کاربر با موفیقت اضافه شد');
    } catch (err) {
        next(err);
    }
}

async function getAllUsers(req, res, next) {
    try {
        const users = await userModel.getAllUsers();
        sendResponse(res, 200, 'Success', users);
    } catch (err) {
        next(err);
    }
}


async function getUserByUserName(req, res, next) {
    const userId = req.params.id;
    try {
        const user = await userModel.getUserById(userId);
        sendResponse(res, 200, 'Success', user);
    } catch (err) {
        next(err);
    }
}


async function deleteUser(req, res, next) {
    const deleteUserId = req.params.id;
    try {
        await userModel.deleteUser(deleteUserId);
        sendResponse(res, 200, 'کاربر با موفیقت حذف شد');
    } catch (err) {
        next(err);
    }
}


async function userUpdate(req, res, next) {
    const userId = req.params.id;
    const userData = req.body;

    try {
        await userModel.userUpdate(userId, userData);
        sendResponse(res, 200, 'اطلاعات کاربر با موفقیت بروزرسانی شد.');
    } catch (err) {
        next(err);
    }
}






module.exports = {
    addUser,
    getAllUsers,
    getUserByUserName,
    deleteUser,
    userUpdate
}


