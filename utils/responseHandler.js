function sendResponse(res, statusCode, message, data = null, error = null) {
    res.status(statusCode).json({
        status: statusCode === 200 ? 'success' : 'error',
        message,
        data,
        error
    });
}

module.exports = { sendResponse };