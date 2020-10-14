const router = require('express').Router();
const controller = require('./controller');

router.get('/', controller.statusController);
router.post('/signin', controller.signin);

module.exports = router;