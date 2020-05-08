const router = require('express').Router();
const { userRoute, loginRoute } = require('./users');
const { articleRoute } = require('./articles');
const { auth } = require('../middlewares/auth');

router.use('/api', loginRoute);
router.use('/api', auth, userRoute);
router.use('/api', auth, articleRoute);

module.exports = {
  router,
};
