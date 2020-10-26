const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../middlewares/auth");
const { validate } = require("./functions");
const { isAdmin } = require("../../middlewares/isAdmin");


router.post("/", [isAuth,validate('store')], controller.store);


module.exports = router;