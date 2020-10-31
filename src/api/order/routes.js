const router = require("express").Router();
const controller = require("./controller");
const {
    isAuth
} = require("../../middlewares/auth");
const {
    validate
} = require("./functions");
const {
    isAdmin
} = require("../../middlewares/isAdmin");

router.get("/", isAuth, controller.index);
router.post("/", [isAuth, validate("store")], controller.store);
router.put("/:order", [isAuth, isAdmin, validate("update")], controller.update);
router.delete("/:order", [isAuth, isAdmin, validate("destroy")], controller.destroy);

module.exports = router;