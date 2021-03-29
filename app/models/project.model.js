const mongoose = require("mongoose");

const Projects = mongoose.model(
  "Projects",
  new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    description:String,
    creatorUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
    
  })
);

module.exports = Projects;


// project
// -name
// -descirption
// -creatorUserId
// // -assignUser[ids]



