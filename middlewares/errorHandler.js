const { sendResponse } = require('../utils/responseHandler');
const { SendError } = require('../utils/sendError');

// async function errorHandler(err, req, res, next) {
//     try {
//         await next()
//     } catch (err) {
//         res.statusCode(400).json({
//     name: err.name,
//             message: err.message,
//             stack: err.stack,
//         })
//     }
// }

function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err.statusCode || 500;
    const isDev = process.env.NODE_ENV === "development";
    const isCustomError = err instanceof SendError;

    let message = isCustomError ? err.message : "خطای سرور. لطفاً بعداً تلاش کنید.";

    const errorData = isDev ? {
        name: err.name,
        message: err.message,
        stack: err.stack,
    } : null;

    return res.status(statusCode).json({
        status: "error",
        message,
        data: null,
        error: isDev ? errorData : undefined,
    });
}

module.exports = errorHandler;