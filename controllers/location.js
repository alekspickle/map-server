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
    const oldLocations = await Location.find({});
    console.log('req.body.locations type', typeof JSON.parse(req.body.locations), JSON.parse(req.body.locations))
    console.log('oldLocations', oldLocations)
    
    const locations = req.body.locations.forEach(el => {
      let location = new Location(el);
      location.save(err => {
        console.log("cannot save locations", err);
        if (err) return next(err);
      });
    });
    console.log("locations", locations)

    //   err => {
    //     console.log("cannot save locations", err);
    //     if (err) return next(404);
    //     else res.status(200).json({ saved: true, locations });
    //     // else res.json({ saved: true, locations });
    //   }
    // );
    console.log("everything is fine");
    res.send("lol");
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
