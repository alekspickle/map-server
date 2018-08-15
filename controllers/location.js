const locationModel = require("../models").Location;

class LocationController {
  async getAll(req, res, next) {
    let locations = [];
    locations = await locationModel.find();

    if (locations.length >= 0) {
      res.json(locations);
    } else next(404);
  }

  async saveNewLocations(req, res, next) {
    console.log('req.body.locations', req.body.locations)
    const locations = await locationModel.create(req.body.locations, err => {
      console.log("cannot save locations",err)
      if (err) return next(404);
      else res.json({ saved: true, locations });
    });
  }

  async update(req, res, next) {
    const payload = getPayload(req);
    const location = await locationModel.findById(req.params.id);
    location
      .update(payload)
      .then((result, model) => {
        res.json({
          message: "success",
          data: result
        });
      })
      .catch(err => {
        next(err);
      });
  }

  async delete(req, res, next) {
    const changes = await locationModel.deleteOne({
      id: req.params.id
    });
    console.log("delete location result", changes);
    if (changes) {
      res.status(204).json({
        message: "success"
      });
    } else {
      next(500);
    }
  }
}

module.exports = new LocationController();
