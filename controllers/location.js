const locationModel = require("../models").Location;

class LocationController {
  async getAll(req, res, next) {
    let locations = [];
    locations = await locationModel.findAll();

    if (locations.length >= 0) {
      res.json(locations);
    } else next(404);
  }

  async getLocation(req, res, next) {
    const location = await locationModel.findById(req.params.id);

    if (location) {
      res.json(location);
    } else {
      next(404);
    }
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

  async create(req, res, next) {
    const payload = getPayload(req);
    locationModel
      .create(payload)
      .then((result, model) => {
        res.status(201).json({
          message: "success",
          data: result
        });
      })
      .catch(err => {
        next(err);
      });
  }

  async delete(req, res, next) {
    const changes = await locationModel.destroy({
      where: {
        id: req.params.id
      }
    });

    if (changes > 0) {
      res.status(204).json({
        message: "success"
      });
    } else {
      next(500);
    }
  }
}

module.exports = new LocationController();
