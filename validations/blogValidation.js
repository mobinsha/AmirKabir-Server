const { body } = require('express-validator');
const {checkBlogExists} = require("../models/blog");

validateAddBlog = [
    body('title')
        .notEmpty()
        .withMessage('عنوان مقاله الزامی است.')
        .bail()
        .isLength({ min: 10 })
        .withMessage('محتوا باید حداقل ۱۰ کاراکتر باشد.')
        .bail()
        .isLength({ max: 225 })
        .withMessage('عنوان مقاله باید حداکثر ۲۲۵ کاراکتر باشد.')
        .bail()
        .matches(/^[a-zA-Z\u0600-\u06FF\u200C0-9\s،.!؟؛:()\[\]{}\-_"'«»]+$/)
        .withMessage('عنوان فقط می‌تواند شامل حروف انگلیسی، فارسی، اعداد و فضاهای خالی باشد.')
        .custom(async (userName) => {
            const blogExist = await checkBlogExists(userName);
            if (blogExist) {
                throw new Error('وبلاگی با این موضوع ثبت شده است');
            }
            return true;
        }),

    body('content')
        .notEmpty()
        .withMessage('محتوای مقاله الزامی است.')
        .bail()
        .isLength({ min: 10 })
        .withMessage('محتوا باید حداقل ۱۰ کاراکتر باشد.')
        .bail()
        .matches(/^[a-zA-Z\u0600-\u06FF\u200C0-9\s،.!؟؛:()\[\]{}\-_"'«»]+$/)
        .withMessage('محتوا فقط می‌تواند شامل حروف انگلیسی، فارسی، اعداد، فضای خالی و برخی علائم باشد.')
];

validateUpdateBlog = [
    body('title')
        .optional().isLength({ min: 10 }).withMessage('محتوا باید حداقل ۱۰ کاراکتر باشد.').bail()
        .isLength({ max: 225 }).withMessage('عنوان مقاله باید حداکثر ۲۲۵ کاراکتر باشد.').bail()
        .matches(/^[a-zA-Z\u0600-\u06FF\u200C0-9\s،.!؟؛:()\[\]{}\-_"'«»]+$/)
        .withMessage('عنوان فقط می‌تواند شامل حروف انگلیسی، فارسی، اعداد و فضاهای خالی باشد.'),

    body('content')
        .optional()
        .isLength({ min: 10 }).withMessage('محتوا باید حداقل ۱۰ کاراکتر باشد.').bail()
        .matches(/^[a-zA-Z\u0600-\u06FF\u200C0-9\s،.!؟؛:()\[\]{}\-_"'«»]+$/)
        .withMessage('محتوا فقط می‌تواند شامل حروف انگلیسی، فارسی، اعداد، فضای خالی و برخی علائم باشد.')
];
module.exports = {
    validateAddBlog,
    validateUpdateBlog
}