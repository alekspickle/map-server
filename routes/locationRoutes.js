const router = require('express').Router();
const locationController = require('../controllers/LocationController');

router.route('/')
    .get(locationController.index)
    .post(locationController.create);

router.route('/:id')
    .get(locationController.detail)
    .put(locationController.edit)
    .delete(locationController.delete);

module.exports = router;