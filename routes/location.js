const router = require("express").Router();
const locationController = require("../controllers/location");

router.route("/").get(locationController.getAll);
router.put("/update", locationController.update);

router.route("/save").post(locationController.saveNewLocations);

router
  .route("/:id")
  .get(locationController.getUserLocations)
  .delete(locationController.delete);

module.exports = router;
