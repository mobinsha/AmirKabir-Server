const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { validateAddComment } = require('../validations/contactValidation');
const { validationResults } = require('../middlewares/validationResults');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { authorize } = require('../middlewares/authorize');

const applyAuthMiddleware = (roles) => [authenticateToken, authorize(roles)];

router.get('/', applyAuthMiddleware(['owner', 'admin']), contactController.getAllComments);
router.get('/:id', applyAuthMiddleware(['owner', 'admin']), contactController.getCommentById);

router.post('/addComment', applyAuthMiddleware(['owner', 'admin']),
    validateAddComment, validationResults, contactController.addComment);

router.delete('/delete/:id', applyAuthMiddleware(['owner', 'admin']), contactController.deleteComment);

module.exports = router;
