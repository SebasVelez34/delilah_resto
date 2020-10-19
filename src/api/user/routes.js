const router = require('express').Router();
const controller = require('./controller');
const { isAuth } = require('../../middlewares/auth');

router.get('/', controller.statusController);
router.get('/private',isAuth, controller.statusController);

module.exports = router;