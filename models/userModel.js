const { dbConnection } = require('../config/dbConnection');
const { SendError } = require('../utils/sendError');
const bcrypt = require('bcryptjs');

async function addUser(userName, password, permission) {
    console.log(userName, password, permission);
    const hashedPassword = await bcrypt.hash(password, 11);
    const [result] = await dbConnection.query(
        'INSERT INTO `users`(`userName`, `password`, `permission`, `status`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, now(), now())',
        [userName, hashedPassword, permission, 'active']
    );
    return { id: result.insertId, userName, permission, status: 'active' };
}

async function getAllUsers() {
    const [result] = await dbConnection.query('SELECT * FROM `users` ORDER BY created_at DESC');
    return result;
}

async function checkUserNameExists(userName) {
    const [rows] = await dbConnection.query('SELECT * FROM users WHERE userName = ?', [userName]);
    return rows.length > 0;
}

async function deleteUser(id) {
    const [result] = await dbConnection.query('DELETE FROM `users` WHERE `id` = ?', [id]);
    if (result.affectedRows === 0) throw new SendError(404, 'کاربر مورد نظر یافت نشد');
    return result;
}

async function getUserById(id) {
    const [result] = await dbConnection.query('SELECT * FROM `users` WHERE id = ?', [id]);
    if (result.length === 0) throw new SendError(404, 'کاربری با این شناسه پیدا نشد');
    return result[0];
}

async function userUpdate(userID, userData) {
    const currentData = await getUserById(userID);
    if (!currentData) throw new SendError(404, 'کاربر مورد نظر پیدا نشد');

    const updatedUser = {
        userName: userData.userName || currentData.userName,
        password: userData.password ? await bcrypt.hash(userData.password, 11) : currentData.password,
        permission: userData.permission || currentData.permission
    };

    const [result] = await dbConnection.query(
        'UPDATE `users` SET `userName` = ?, `password` = ?, `permission` = ? WHERE `id` = ?',
        [updatedUser.userName, updatedUser.password, updatedUser.permission, userID]
    );

    if (result.changedRows === 0) throw new SendError(400, 'اطلاعات جدیدی وارد نشده است');
    return result;
}

module.exports = {
    addUser,
    checkUserNameExists,
    getAllUsers,
    getUserById,
    deleteUser,
    userUpdate,
};
