const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const locationRoutes = require('./locationRoutes');

router.use('/', userRoutes);
router.use('/auth', authRoutes);
router.use('/location', locationRoutes);

module.exports = router;
