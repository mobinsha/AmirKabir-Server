const { validationResult } = require('express-validator');
const {sendResponse} = require("../utils/responseHandler");

function validationResults(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return sendResponse(res, 400, 'ارور های اعتبار سنجی', null, errors.array());
    }
    next()
}

module.exports = {validationResults}
