class SendError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'SendError';
    }
}

module.exports = { SendError };
