const express = require('express');
const router = express.Router();
const multer = require("../../utils/multer");
const slideController = require("../../controllers/admin/slide");
const {validateUploadSlide} = require("../../validations/slide");
const {validationResults} = require("../../middlewares/validationResults");
const {authenticateToken} = require('../../middlewares/authenticateToken')
const {authorize} = require('../../middlewares/authorize')

const applyAuthMiddleware = (roles) => [authenticateToken, authorize(roles)];

router.post('/upload', applyAuthMiddleware(['owner', 'admin']), multer.single('imageUrl'),
    validateUploadSlide, validationResults, slideController.uploadSlide);

router.delete('/delete/:id', applyAuthMiddleware(['owner', 'admin']), slideController.deleteSlide);

module.exports = router;

