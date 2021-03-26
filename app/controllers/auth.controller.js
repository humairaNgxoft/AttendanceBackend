const config = require("../config/auth.config");
const db = require("../models");
const controller = require("../controllers/file.controller");
// const fetch = require('node-fetch');
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {  
  try {
    await controller.upload(req, res);
    if (!req.body.username && !req.body.email && !req.body.password) {
      throw { message: 'Please enter the username, email and password to signup' };
    }
    else if (!req.body.username) {
      throw { message: 'please enter the username' };
    }
    else if (!req.body.email) {
      throw { message: 'please enter the email' };
    }
    // else if (!req.body.password) {
    //   throw { message: 'please enter the valid password' };
    // }

    // const imageRes = await fetch(`http://localhost:8080/upload`, {
    //   method: 'POST',
    //   body: req
    // });
    // console.log(imageRes)
  const user = new User({
    _id: Math.random(),
    username: req.body.username,
    email: req.body.email,
    // password: bcrypt.hashSync(req.body.password, 8),
    phone: req.body.phone,
    entryTime: req.body.entryTime,
    exitTime: req.body.exitTime,
    assignedWorkingHours: req.body.assignedWorkingHours,
    avatar: req.file.path
  });

    if (true) {
      Role.find(
        {
          name: { $in: ["user","admin"] }
        },
        (err, roles) => {
          if (err) throw { message: err };

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) throw { message: err };

            res.status(200).send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) throw { message: err };

        user.roles = [role._id];
        user.save(err => {
          if (err) throw { message: err };

          res.status(200).send({ message: "User was registered successfully!" });
        });
      });
    }

  } catch ({ message }) {
    console.log(message)
    res.status(500).send({ message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username }).populate("roles", "-__v").exec();

    if (!user) throw { message: 'User not found.' }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) throw { message: 'Invalid password.' }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    var authorities = [];

    for (let i = 0; i < user.roles.length; i++) {
      authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });

  } catch ({ message }) {
    res.status(500).send({ message });
  }
};

