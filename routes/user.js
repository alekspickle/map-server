const router = require("express").Router();
const userController = require("../controllers/user");

router.route("/all").get(userController.getAll);

router.route("/:id").delete(userController.delete);

router.route("/user/:id/location").get(userController.indexLocation);

router.route("/user/:id/location/:id").get(userController.detailLocation);

module.exports = router;
