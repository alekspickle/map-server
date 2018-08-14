const router = require("express").Router();
const locationController = require("../controllers/location");

router
  .route("/")
  .get(locationController.getAll)
router
  .route("/save")
  .get(locationController.saveNewLocations)

router
  .route("/:id")
  .put(locationController.update)
  .delete(locationController.delete);

module.exports = router;
