const userModel = require("../models").User;
const locationModel = require("../models").Location;
const getPayload = require("./payload");

class UserController {
  async getAll(req, res, next) {
    let users = [];
    users = await userModel.findAll();
    if (users.length >= 0) {
      console.log("users.length", users.length);
      res.json(users);
    } else next(404);
  }

  async delete(req, res, next) {
    const changes = await userModel.destroy({
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

  async indexLocation(req, res, next) {
    const user = await userModel.findById(req.params.id, {
      include: [
        {
          model: locationModel,
          as: "Locations"
        }
      ]
    });
    if (user) {
      res.json(user);
    } else next(404);
  }

  async detailLocation(req, res, next) {
    const location = await locationModel.find({
      where: {
        user_id: req.params.id,
        id: req.params.id
      }
    });

    if (location) {
      res.json(location);
    } else next(404);
  }

  async login(req, res, next) {
    const user = await userModel.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      next(404);
    } else {
      user.checkPassword(req.body.password, user.password);
    }
  }

  async register(req, res, next) {
    const payload = getPayload(req);
    console.log("payload", payload, "req.body", req.body);
    userModel
      .create(payload)
      .then((result, model) => {
        console.log("new user registered");
      })
      .catch(err => {
        console.log("could not register user", err.message);
        next();
      });
  }
}

module.exports = new UserController();
