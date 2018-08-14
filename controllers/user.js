const userModel = require("../models").User;
const checkPassword = require(".././helpers/passHelper");

class UserController {
  async getAll(req, res, next) {
    let users = [];
    users = await userModel.find();
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
      email: req.body.email
    });
    // console.log("user", user)
    if (!user) {
      next(404);
    } else {
      checkPassword(req.body.password, user.password, (e, result) => {
        console.log("compare result", result);
        if (result) return res.status(200).send({ login: true, user: user });

        res.sendStatus(401);
      });
    }
  }

  async register(req, res, next) {
    let user = new userModel({
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
