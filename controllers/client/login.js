const {checkForLogin} = require("../../models/login");
const {comparePassword} = require("../../utils/comparePassword");
const jwt = require("jsonwebtoken");
const {sendResponse} = require("../../utils/responseHandler");


async function login(req, res, next) {
    const { userName, password } = req.body;
    try {
        const user = await checkForLogin(userName)
        const isMatch = await comparePassword(password, user[0].password)

        if (!isMatch) return sendResponse(res, 403, 'نام کاربری یا رمز عبور اشتباه است.', null);
        // Create json web token
        const token = jwt.sign({id: user[0].id, permission: user[0].permission },
            process.env.JWT_SECRET,
            {algorithm : 'HS256', expiresIn: '1h'})

        const thisUser = {id: user[0].id, userName: user[0].userName, permission: user[0].permission}
        sendResponse(res, 200, 'کاربر با موفقیت وارد شد.', {token : token, thisUser});
    } catch (err) {
        next(err);
    }
}


module.exports = { login }