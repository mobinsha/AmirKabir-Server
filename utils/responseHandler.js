function sendResponse(res, statusCode, message, data = null, error = null) {
    const isSuccess = String(statusCode).startsWith('2'); // 200–299 are success codes

    res.status(statusCode).json({
        status: isSuccess ? 'success' : 'error',
        message,
        ...(isSuccess ? { data } : { error })
    });
}

module.exports = { sendResponse };