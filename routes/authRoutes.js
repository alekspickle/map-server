const router = require('express').Router();
const userController = require('../controllers/UserController');

router.route('/login')
    .post(userController.authLogin);
router.route('/register')
    .post(userController.authRegister);

module.exports = router;