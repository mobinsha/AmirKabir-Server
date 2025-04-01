const express = require('express')
const router = express.Router();
const {validateAddBlog, validateUpdateBlog} = require('../../validations/blogValidation')
const {validationResults} = require('../../middlewares/validationResults')
const {authenticateToken} = require('../../middlewares/authenticateToken')
const {authorize} = require('../../middlewares/authorize')
const blogController = require('../../controllers/admin/blog');

const applyAuthMiddleware = (roles) => [authenticateToken, authorize(roles)];

router.post('/addBlog', applyAuthMiddleware(['owner', 'admin']),
    validateAddBlog, validationResults, blogController.addBlog);

router.put('/update/:id', applyAuthMiddleware(['owner', 'admin']),
    validateUpdateBlog, validationResults, blogController.updateBlog)

router.delete('/delete/:id', applyAuthMiddleware(['owner', 'admin']), blogController.deleteBlog)

module.exports = router;