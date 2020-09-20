const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const add = req.body.add;
  const notes = req.body.notes;
  console.log(req.body);
  try {
    validationResult(req).throw();

    try {
      const hashedPw = await bcrypt.hash(password, 12);

      const user = await User.create({
        email: email,
        password: hashedPw,
        name: name,
        add: add,
        notes: notes,
      });
      console.log(user.toJSON());
      res.status(201).json({ message: "User created!", userId: user.id });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      const error = new Error("A user with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser.id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser.id.toString(),
      isAdmin: loadedUser.isAdmin,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      name: user.name,
      email: user.email,
      add: user.add,
      notes: user.notes,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    let name = [];
    let email = []; 
    const user = await User.findAll({
      where: { isAdmin: "false" },
    }).then((accounts) => accounts.map((a,b,c) => {
      name.push(a.name);
      email.push(a.email)
    }));
    console.log(name);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      name: name,
      email: email,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateUserStatus = async (req, res, next) => {
  // const newStatus = req.body.status;
  // try {
  //   const user = await User.findById(req.userId);
  //   if (!user) {
  //     const error = new Error("User not found.");
  //     error.statusCode = 404;
  //     throw error;
  //   }
  //   user.status = newStatus;
  //   await user.save();
  //   res.status(200).json({ message: "User updated." });
  // } catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // }
};
