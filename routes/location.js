const router = require('express').Router();
const locationController = require('../controllers/location');

router.route('/')
    .get(locationController.getAll)
    .post(locationController.create);

router.route('/:id')
    .get(locationController.getLocation)
    .put(locationController.update)
    .delete(locationController.delete);

module.exports = router;