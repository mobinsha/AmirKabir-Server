const express = require('express')
const router = express.Router();


router.post('/',
    require("../validations/loginValidation").validateLogin,
    require("../middlewares/validationResults").validationResults,
    require("../controllers/loginController").login);

module.exports = router;