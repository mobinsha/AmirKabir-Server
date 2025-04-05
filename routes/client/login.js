const express = require('express')
const router = express.Router();


router.post('/',
    require("../../validations/login").validateLogin,
    require("../../middlewares/validationResults").validationResults,
    require("../../controllers/client/login").login);

module.exports = router;