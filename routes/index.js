const router = require('express').Router();
const { userRoute, loginRoute } = require('./users');
const { articleRoute, articleNewsApi } = require('./articles');
const { auth } = require('../middlewares/auth');

router.use('/api', loginRoute);
router.use('/api', auth, userRoute);
router.use('/api', auth, articleRoute);
router.use('/news', articleNewsApi);

module.exports = {
  router,
};
