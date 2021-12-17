const router = require('express').Router();
const userRoutes = require('./userRoutes');
const notesRoutes = require('./notes')

router.use('/user', userRoutes);
router.use('/notes', notesRoutes)

module.exports = router;
