const bCrypt = require("bcrypt");
const userModel = require("../models").User;
const locationModel = require("../models").Location;
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

  async check(req, res, next) {
    const user = await userModel.find(e => {
      if (e) return res.status(e.status).send(e.message);
    });
    // const location = await locationModel.find(err => {
    //   if (err) return res.status(e.status).send(e.message);
    // });
    res.send({ users: user, locs: location });
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

  async update(req, res, next) {
    const user = await userModel.findOneAndUpdate(
      {
        email: req.body.email
      },
      req.body,
      (err, updated) => {
        if (err) console.log("could not update user", err);
        return;
      }
    );
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
    const changes = await userModel.findByIdAndRemove(req.params.id, err => {
      if (err) return next(err);
      res.send("Deleted successfully!");
    });
  }
}

module.exports = new UserController();
