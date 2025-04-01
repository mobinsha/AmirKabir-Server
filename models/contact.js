const {dbConnection} = require('../config/dbConnection');
const {SendError} = require('../utils/sendError');

async function addComment(userData) {
    return new Promise((resolve, reject) => {
        dbConnection.query(
            'INSERT INTO `contactus`(`name`, `email`, `phoneNumber`, `subject`, `message`, `created_at`)' +
            ' VALUES (?,?,?,?,?,now())',
            [userData.name, userData.email, userData.phoneNumber, userData.subject, userData.message,],
            (err, result) => {
            if (err) return reject(new SendError(500, err))
            else resolve({id: result.insertId, ...userData})
        })
    })
}

async function getAllComments() {
    return new Promise((resolve, reject) => {
        dbConnection.query('SELECT * FROM contactus', (err, result) => {
            if (err) return reject(new SendError(500, err))
            else resolve(result);
        });
    });
}

async function getCommentById(id) {
    return new Promise((resolve, reject) => {
        dbConnection.query('SELECT * FROM contactus WHERE id = ?', [id],
            (err, result) => {
                if (err) return reject(new SendError(500, err))
                if (result.length === 0) return reject(new SendError(404, 'نظری با این شناسه پیدا نشد'))
                else resolve(result)
            });
    });
}

async function deleteComment(id) {
    return new Promise((resolve, reject) => {
        dbConnection.query('DELETE FROM `contactus` WHERE id = ?', [id],
            (err, result) => {
                if (err) return reject(new SendError(500, err))
                if (result.affectedRows === 0) return reject(new SendError(404, 'نظری با این شناسه پیدا نشد'))
                else resolve(result)
            });
    });
}

module.exports = {
    addComment,
    getAllComments,
    getCommentById,
    deleteComment
}





