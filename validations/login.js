const {body} = require("express-validator");

validateLogin = [
    body('userName')
        .exists().withMessage('نام کاربری الزامی است.')
        .isString().withMessage('نام کاربری باید یک رشته باشد.')
        .isLength({ max: 50 }).withMessage('نام کاربری نباید بیشتر از ۵۰ کاراکتر باشد.')
        .custom(async (value) => {
            if (!/^[A-Za-z][A-Za-z0-9]*$/.test(value)) {
                throw new Error('نام کاربری باید با یک حرف شروع شود و تنها شامل حروف و اعداد باشد.');
            }
            if (value.length < 5 || value.length > 50) {
                throw new Error('نام کاربری باید بین ۵ تا ۵۰ کاراکتر باشد.');
            }
            return true;
        }),

    body('password')
        .exists().withMessage('رمز عبور الزامی است.')
        .isString().withMessage('رمز عبور باید یک رشته باشد.')
        .isLength({ min: 6 }).withMessage('رمز عبور باید حداقل ۶ کاراکتر باشد.')
        .isLength({ max: 128 }).withMessage('رمز عبور نباید بیشتر از ۱۲۸ کاراکتر باشد.')
];

module.exports = {validateLogin}