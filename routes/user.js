const router = require("express").Router();
const userController = require("../controllers/user");

router.route("/all").get(userController.getAll);

router.route("/:id").delete(userController.delete);

module.exports = router;
