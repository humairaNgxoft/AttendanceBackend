
const Task = require("../models/task.model");
const mongoose = require('mongoose')


exports.findOne = (req, res) => {
  
   const id = req.params.id;

  Task.findById(id)
//   .populate("User")
//    .exec() // key to populate
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found task with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving task with id=" + id });
    });
};


exports.taskCreate = (req,res)=>{
   const task = new Task({
      _id : new mongoose.Types.ObjectId(),
      name:req.body.name,
      time:req.body.time,
     
   })
   task.save(task)
   .then(result=>{
      console.log(result)
      res.status(200).json({
         message:"task saved"}) }).catch(err=>{
      console.log(err)
      res.status(500).json({
         error:err
      })
   })
}


exports.taskUpdate = (req,res)=>{

   try {
      if (!req.body.name && !req.body.time) {
        throw { message: 'Please enter the name and time of task.' };
      }
      else if (!req.body.name) {
        throw { message: 'please enter the name of task.' };
      }
      else if (!req.body.time) {
        throw { message: 'please enter the time of task.' };
      }
  
    const id = req.params.id;
   
    const data = Task.findByIdAndUpdate(id, body, { useFindAndModify: false });
     
        if (!data) {
          res.status(404).send({
            message
          });
        } else res.send({ message: "Task was updated successfully." });
      }
      catch( {message}){
        res.status(500).send({  message });
      }
}


 
 // Delete a Tutorial with the specified id in the request
 exports.taskDelete = (req, res) => {
   const id = req.params.id;
 
   Task.findByIdAndRemove(id)
     .then(data => {
       if (!data) {
         res.status(404).send({
           message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
         });
       } else {
         res.send({
           message: "Task was deleted successfully!"
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete Task with id=" + id
       });
     });
 };
 