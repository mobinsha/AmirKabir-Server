const express = require('express');
const router = express.Router();
const slideController = require('../../controllers/client/slide');

router.get('/', slideController.getAllSlides);
router.get('/:title', slideController.getSlideByTitle);

module.exports = router;
