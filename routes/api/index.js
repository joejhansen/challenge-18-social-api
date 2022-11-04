const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const usersRoutes = require('./usersRoutes')

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
