const {sendResponse} = require("../utils/responseHandler");

function authorize(allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user.permission
        if (!allowedRoles.includes(userRole)) {
           return sendResponse(res, 403, 'دسترسی رد شد. سطح دسترسی کافی نیست.');
        }
        next();
    }
}

module.exports = { authorize };
