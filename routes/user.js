const router = require("express").Router();
const userController = require("../controllers/user");

// console.log("enter routes");

router.route("/check").get(userController.check);

router.route("/login").post(userController.login);

router.route("/register").post(userController.register);

router.route("/all").get(userController.getAll);

router
  .route("/:id")
  .delete(userController.delete)
  .put(userController.update);

module.exports = router;
