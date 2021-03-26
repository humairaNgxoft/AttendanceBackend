const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    _id: String,
    username: String,
    email: String,
    avatar: String,
    // password: String,
    phone: String,
    entryTime: String,
    exitTime: String,
    assignedWorkingHours: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
