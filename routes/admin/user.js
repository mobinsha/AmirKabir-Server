const express = require('express')
const router = express.Router();
const userController = require('../../controllers/admin/user');
const {validateRegister, validateUpdate} = require('../../validations/user')
const {validationResults} = require('../../middlewares/validationResults')


router.post('/add', validateRegister, validationResults, userController.addUser);
router.get('/', userController.getAllUsers);

router.get('/:id',userController.getUserByUserName);
router.put('/update/:id', validateUpdate, validationResults, userController.userUpdate)

router.delete('/delete/:id', userController.deleteUser)

module.exports = router;
