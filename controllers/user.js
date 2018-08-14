const bCrypt = require("bcrypt");
const userModel = require("../models").User;
const checkPassword = require(".././helpers/passHelper");
const saltRounds = 10;

class UserController {
  async getAll(req, res, next) {
    let users = [];
    users = await userModel.find();
    if (users.length >= 0) {
      console.log("users.length", users.length);
      res.json(users);
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
    const { email, name, password } = req.body;
    if (!email || !name || !password) return res.sendStatus(500);
    const isExist = await userModel.findOne({ email: email });
    if (isExist) return res.sendStatus(418);

    const encrypted = await bCrypt.hash(password, saltRounds);
    console.log("encrypted", password, encrypted);

    let user = await userModel.create({
      email: email,
      name: name,
      password: encrypted
    });

    user.save(err => {
      if (err) {
        return next(err);
      }
      res.send("User Created successfully");
    });
  }

  async delete(req, res, next) {
    const changes = await userModel.deleteOne({
      _id: req.params.id
    });

    console.log("delete user result", changes);

    if (changes > 0) {
      res.status(204).json({
        message: "success"
      });
    } else {
      next(500);
    }
  }
}

module.exports = new UserController();
