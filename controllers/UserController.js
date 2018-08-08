const userModel = require("../models").User;
const locationModel = require("../models").Location;
const getPayload = require("./payload");

class UserController {
  async index(req, res, next) {
    let users = [];
    users = await userModel.findAll();
    if (users.length >= 0) {
      console.log(users.length);
      res.json(users);
    } else next(404);
  }

  async create(req, res, next) {
    const payload = getPayload(req);
    userModel
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
    const changes = await userModel.destroy({
      where: {
        id: req.params.nick
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
    const user = await userModel.findById(req.params.nick, {
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
        UserId: req.params.nick,
        id: req.params.id
      }
    });

    if (location) {
      res.json(location);
    } else next(404);
  }

  async authLogin(req, res, next) {
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

  async authRegister(req, res, next) {
    const payload = getPayload(req);
    userModel
      .create(payload)
      .then((result, model) => {
        console.log('new user registered')
      })
      .catch(err => {
        next('could not register user',err);
      });
  }
}

module.exports = new UserController();
