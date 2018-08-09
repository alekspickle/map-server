const router = require('express').Router();
const user = require('./user');
const auth = require('./auth');
const location = require('./location');


router.use('/', user);
router.use('/auth', auth);
router.use('/location', location);

module.exports = router;
