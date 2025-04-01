const {dbConnection} = require("../config/dbConnection");
const {SendError} = require("../utils/sendError");

// parametr exteraxtion
async function checkForLogin(userName) {
    const [rows] = await dbConnection.query('SELECT * FROM users WHERE userName = ?', [userName]);
    if (rows.length === 0) throw new SendError(404, 'کاربر یافت نشد.');
    return rows;
}

// async function checkForLogin(userName) {
//     return new Promise((resolve, reject) => {
//         dbConnection.query('SELECT * FROM `users` Where userName = ? ',
//             [userName],
//             (err, result) => {
//                 if (err) return reject(new SendError(500, err));
//                 if (result.length === 0) return reject(new SendError(404, 'شناسه کاربری اشتباه است'));
//                 else resolve(result);
//             });
//     });
// }

module.exports = { checkForLogin }