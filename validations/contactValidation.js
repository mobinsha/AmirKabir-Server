const {body} = require('express-validator');

validateAddComment = [
    body('name')
        .notEmpty().withMessage('نام نمی‌تواند خالی باشد').bail()
        .isLength({ min: 3, max: 100 }).withMessage('نام باید بین ۳ تا ۱۰۰ کاراکتر باشد').bail(),
    body('email')
        .notEmpty().withMessage('ایمیل نمی‌تواند خالی باشد').bail()
        .isEmail().withMessage('ایمیل معتبر نیست').bail(),
    body('phoneNumber')
        .optional()
        .isMobilePhone('fa-IR').withMessage('شماره تلفن معتبر نیست').bail(),
    body('subject')
        .notEmpty().withMessage('موضوع نمی‌تواند خالی باشد').bail()
        .isLength({ min: 5, max: 255 }).withMessage('موضوع باید بین ۵ تا ۲۵۵ کاراکتر باشد').bail(),
    body('message')
        .notEmpty().withMessage('پیام نمی‌تواند خالی باشد')
        .isLength({ min: 10, max: 1000 }).withMessage('پیام باید حداقل ۱۰ و حداکثر ۱۰۰۰ کاراکتر باشد'),
]

module.exports = {
    validateAddComment
}
