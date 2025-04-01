const bcrypt = require('bcryptjs')
const { SendError } = require('../utils/sendError');

async function comparePassword(inputPassword, userPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputPassword, userPassword, (err, isMatch) => {
            if (err) {
                // در حالت توسعه جزئیات ارور نمایش داده می‌شود
                const errorMessage = process.env.NODE_ENV === 'development' ? err : 'خطای سرور در مقایسه رمز عبور.';
                return reject(new SendError(500, errorMessage));
            }
            if (!isMatch) return reject(new SendError(401, 'رمز عبور اشتباه است.'))
            else resolve(isMatch)
        })
    });
}

module.exports = {comparePassword}