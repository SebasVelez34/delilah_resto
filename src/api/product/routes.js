const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../middlewares/auth");
const { validate } = require("./functions");

router.get("/", isAuth, controller.index);
router.get("/:product", [isAuth, validate("show")], controller.show);
router.post("/", [isAuth, validate("store")], controller.store);
router.put("/:product", [isAuth, validate("update")], controller.update);

module.exports = router;
