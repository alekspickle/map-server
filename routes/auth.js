const router = require("express").Router();
const userController = require("../controllers/user");

router.route("/login").post(userController.loginMongo);

router.route("/register").post(userController.registerMongo);

module.exports = router;
