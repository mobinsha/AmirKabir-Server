const express = require('express');
const router = express.Router();
const slideController = require('../controllers/slideController');
const multer = require('../utils/multer')
const {validateUploadSlide} = require('../validations/slideValidation')
const {validationResults} = require('../middlewares/validationResults')
const {authenticateToken} = require('../middlewares/authenticateToken')
const {authorize} = require('../middlewares/authorize')

const applyAuthMiddleware = (roles) => [authenticateToken, authorize(roles)];

router.get('/', applyAuthMiddleware(['owner', 'admin']), slideController.getAllSlides);
router.get('/:title', applyAuthMiddleware(['owner', 'admin']), slideController.getSlideByTitle);

router.post('/upload', applyAuthMiddleware(['owner', 'admin']), multer.single('imageUrl'),
    validateUploadSlide, validationResults, slideController.uploadSlide);

router.delete('/delete/:id', applyAuthMiddleware(['owner', 'admin']), slideController.deleteSlide);

module.exports = router;
