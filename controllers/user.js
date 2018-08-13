const userModel = require("../models").User;
const UserModel = require("../models/userMongo");
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
    // console.log("user", user)
    if (!user) {
      next(404);
    } else {
      user.checkPassword(req.body.password, user.password, (e, result) => {
        console.log("compare result", result);
        if (result) return res.status(200).send({ login: true, user: user });

        res.sendStatus(401);
      });
    }
  }

  async register(req, res, next) {
    const payload = getPayload(req);
    // console.log("payload", payload, "req.body", req.body);
    userModel
      .create(payload)
      .then((result, model) => {
        res.status(200).send({ registered: true });
        console.log("new user registered");
      })
      .catch(err => {
        console.log("could not register user", err.message);
        next();
      });
  }
  async loginMongo(req, res, next) {}

  async registerMongo(req, res, next) {
    let user = new UserModel({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });

    user.save(err => {
      if (err) {
        return next(err);
      }
      res.send("User Created successfully");
    });
  }
}

module.exports = new UserController();
