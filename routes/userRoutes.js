const router = require('express').Router();
const userController = require('../controllers/UserController');

router.route('/')
    .get(userController.index)
    .post(userController.create);

router.route('/user/:nick')
    .get(userController.detail)
    .put(userController.edit)
    .delete(userController.delete);

router.route('/user/:nick/location')
    .get(userController.indexLocation);

router.route('/user/:nick/location/:id')
    .get(userController.detailLocation);

module.exports = router;