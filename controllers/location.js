const Location = require("../models").Location;

class LocationController {
  async getAll(req, res, next) {
    let locations = [];
    locations = await Location.find();

    if (locations.length >= 0) {
      res.json(locations);
    } else next(404);
  }

  async saveNewLocations(req, res, next) {
    if(!req.body.locations) return next(400)
    const reqLocations = req.body.locations;
    let newLocs = [];

    reqLocations.forEach(el => {
      // console.log("el._id", el._id); //TEST
      if (el._id) return; //if there is such id exit
      const location = new Location(el);
      location.save((err, loc) => {
        newLocs.push(loc);
        if (err) {
          console.log("cannot save location", err.message);
          return next(err);
        }
      });
    });

    console.log("saved locations", newLocs);
    if (!newLocs.length) return res.send({ inserted: false });
    return res.send({ inserted: newLocs });
  }

  async getUserLocations(req, res, next) {
    const locations = await Location.find({ user_id: req.params.id });
    // console.log("user locations", locations);
    res.send({ locations });
  }

  async update(req, res, next) {
    const payload = getPayload(req);
    const location = await Location.findById(req.params.id);
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
    const changes = await Location.deleteOne({
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
