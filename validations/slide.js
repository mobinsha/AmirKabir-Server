const { body } = require('express-validator');

validateUploadSlide = [
    body('title')
        .notEmpty()
        .withMessage('عنوان اسلاید الزامی است.')
        .bail()
        .isLength({ min: 1 })
        .withMessage('عنوان اسلاید باید حداقل ۱ کاراکتر باشد.')
        .bail()
        .isLength({ max: 100 })
        .withMessage('عنوان اسلاید باید حداکثر 100 کاراکتر باشد.')
        .bail()
        .matches(/^[a-zA-Z\u0600-\u06FF\u200C0-9\s،.!؟؛:()\[\]{}\-_"'«»]+$/)
        .withMessage('عنوان اسلاید فقط می‌تواند شامل حروف انگلیسی، فارسی، اعداد و فضاهای خالی باشد.'),
    body('description')
        .notEmpty()
        .withMessage('توضیحات اسلاید الزامی است.')
        .bail()
        .isLength({ min: 10 })
        .withMessage('توضیحات اسلاید باید حداقل 10 کاراکتر باشد.')
        .bail()
        .isLength({max:1000})
        .withMessage('توضیحات اسلاید باید حداقل 1000 کاراکتر باشد.')
        .bail()
]
module.exports = {
    validateUploadSlide
}
