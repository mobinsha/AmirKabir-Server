const { body } = require('express-validator');
const { checkUserNameExists } = require('../models/user');

validateRegister = [
    body('userName')
        .isString().withMessage('نام کاربری باید یک رشته باشد.').bail()
        .matches(/^[A-Za-z][A-Za-z0-9]*$/).withMessage('نام کاربری باید با یک حرف شروع شود و تنها شامل حروف و اعداد باشد.').bail()
        .isLength({ min: 5, max: 50 }).withMessage('نام کاربری باید بین ۵ تا ۵۰ کاراکتر باشد.').bail()
        .custom(async (userName) => {
            const userExist = await checkUserNameExists(userName);
            if (userExist) {
                throw new Error('نام کاربری وارد شده قبلاً استفاده شده است.');
            }
            return true;
        }),

    body('password')
        .isString().withMessage('رمز عبور باید یک رشته باشد.').bail()
        .notEmpty().withMessage('رمز عبور الزامی است.').bail()
        .isLength({ min: 6 }).withMessage('رمز عبور باید حداقل ۶ کاراکتر باشد.').bail()
        .isLength({ max: 128 }).withMessage('رمز عبور نباید بیشتر از ۱۲۸ کاراکتر باشد.').bail()
        .matches(/[A-Z]/).withMessage('رمز عبور باید حداقل یک حرف بزرگ داشته باشد.').bail()
        .matches(/[a-z]/).withMessage('رمز عبور باید حداقل یک حرف کوچک داشته باشد.').bail()
        .matches(/[0-9]/).withMessage('رمز عبور باید حداقل یک عدد داشته باشد.'),

    body('permission')
        .isIn(['owner', 'admin', 'manager']).withMessage('سطح دسترسی نامعتبر است.')
];

validateUpdate = [
    body('userName')
        .optional()
        .isString().withMessage('نام کاربری باید یک رشته باشد.').bail()
        .matches(/^[A-Za-z][A-Za-z0-9]*$/).withMessage('نام کاربری باید با یک حرف شروع شود و تنها شامل حروف و اعداد باشد.').bail()
        .isLength({ min: 5, max: 50 }).withMessage('نام کاربری باید بین ۵ تا ۵۰ کاراکتر باشد.').bail()
        .custom(async (userName) => {
            const userExist = await checkUserNameExists(userName);
            if (userExist) {
                throw new Error('نام کاربری وارد شده قبلاً استفاده شده است.');
            }
            return true;
        }),

    body('password')
        .optional()
        .isString().withMessage('رمز عبور باید یک رشته باشد.').bail()
        .isLength({ min: 6 }).withMessage('رمز عبور باید حداقل ۶ کاراکتر باشد.').bail()
        .isLength({ max: 128 }).withMessage('رمز عبور نباید بیشتر از ۱۲۸ کاراکتر باشد.').bail()
        .matches(/[A-Z]/).withMessage('رمز عبور باید حداقل یک حرف بزرگ داشته باشد.').bail()
        .matches(/[a-z]/).withMessage('رمز عبور باید حداقل یک حرف کوچک داشته باشد.').bail()
        .matches(/[0-9]/).withMessage('رمز عبور باید حداقل یک عدد داشته باشد.'),

    body('permission')
        .optional()
        .isIn(['owner', 'admin', 'manager']).withMessage('سطح دسترسی نامعتبر است.')
];

module.exports = {
    validateUpdate,
    validateRegister
};
