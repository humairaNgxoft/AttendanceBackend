const mongoose = require("mongoose");

const Attendance = mongoose.model(
  "Attendance",
  new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    checkin:Date,
    checkout:Date,
    currentTime:String,
    name:String,
    estimatedWorkingHours:String,
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
    
  })
);

module.exports = Attendance;
// attandance
// -title
// -userId {

// } 