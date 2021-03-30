
const Attendance = require("../models/attendance.model");
const mongoose = require('mongoose')


exports.findOne = (req, res) => {
  
   const id = req.params.id;

  Attendance.findById(id)
  .populate("User")
   .exec() // key to populate
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};


exports.attendanceCreate = (req,res)=>{
   const attendance = new Attendance({
      _id : new mongoose.Types.ObjectId(),
      name:req.body.name,
      estimatedWorkingHours:req.body.estimatedWorkingHours,
      User:req.body.userId
   })
   attendance.save(attendance)
   .then(result=>{
      console.log(result)
      res.status(200).json({
         message:"user saved",
         createdby:{
            id:result._id,
            name:result.name,
            estimatedWorkingHours:result.estimatedWorkingHours,
            request:{
               type:'GET',
               url:'http://localhost:8080/api/attendance/'+result._id
            }
         }
         
      })
   }).catch(err=>{
      console.log(err)
      res.status(500).json({
         error:err
      })
   })
}
   //delete
   exports.attendanceDelete = (req, res) => {
      const id = req.params.id;
    
      Attendance.findByIdAndRemove(id)
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot delete attendace record with id=${id}. Maybe attendance was not found!`
            });
          } else {
            res.send({
              message: "attendace was deleted successfully!"
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete attendace with id=" + id
          });
        });
    };

    //update
    exports.attendanceUpdate = (req,res)=>{

     
      Attendance.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true },
        (err, attendeance) => {
    
          if (err) {
            error.message = "id not found"
            return res.status(404).json(error)
          }
          console.log(attendeance)
          res.json(attendeance);
    
        }).catch(err => console.log(err))
      
      
   }
   
   
    