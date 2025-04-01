const {sendResponse} = require("../utils/responseHandler");
const jwt = require("jsonwebtoken");
require('dotenv').config();

function authenticateToken(req, res, next){
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return sendResponse(res, 401, 'توکن ارائه نشده است. لطفاً توکن را در هدر Authorization قرار دهید.')
    }

    if (token === process.env.PUBLIC_TOKEN){
        req.user = { permission: 'public' }
        return next()
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) return sendResponse(res, 403, 'توکن نامعتبر است. لطفاً یک توکن معتبر ارائه دهید.')
        else {
            req.user = decode
            next()
        }
    })

}

module.exports = {authenticateToken}