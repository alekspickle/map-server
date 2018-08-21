const router = require("express").Router();
const locationController = require("../controllers/location");

router
  .route("/")
  .get(locationController.getAll)
router
  .route("/save")
  .post(locationController.saveNewLocations)

router
  .route("/:id")
  .get(locationController.getUserLocations)
  .put(locationController.update)
  .delete(locationController.delete);

module.exports = router;
