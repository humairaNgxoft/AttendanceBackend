const mongoose = require("mongoose");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    time:String,
    name:String,
    
  })
);

module.exports = Task;
// task 
// -name
// -time 