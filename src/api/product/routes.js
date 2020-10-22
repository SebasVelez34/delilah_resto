const router = require("express").Router();
const controller = require("./controller");
const { isAuth } = require("../../middlewares/auth");
const { validate } = require("./functions");
const { isAdmin } = require("../../middlewares/isAdmin");

router.get("/", isAuth, controller.index);
router.get("/:product", [isAuth, validate("show")], controller.show);
router.post("/", [isAuth, isAdmin, validate("store")], controller.store);
router.put(
	"/:product",
	[isAuth, isAdmin, validate("update")],
	controller.update
);
router.delete(
	"/:product",
	[isAuth, isAdmin, validate("destroy")],
	controller.destroy
);

module.exports = router;
