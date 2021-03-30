
const Projects = require("../models/project.model");
const mongoose = require('mongoose')


exports.findOne = (req, res) => {
  
   const id = req.params.id;

   Projects.findById(id)
   .populate("creatorUserId")
   .exec() // key to populate
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found project with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving project with id=" + id });
    });
};


exports.projectCreate = (req,res)=>{
   const project = new Projects({
      _id : new mongoose.Types.ObjectId(),
      name:req.body.name,
      description:req.body.description,
      creatorUserId:req.body.userId
   })
   project.save(project)
   .then(result=>{
      console.log(result)
      res.status(200).json({
         message:"project saved",
         createdby:{
            id:result._id,
            name:result.name,
            description:result.description,
            request:{
               type:'GET',
               url:'http://localhost:8080/api/project/'+result._id
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
exports.projectDelete = (req, res) => {
   const id = req.params.id;
 
   Projects.findByIdAndRemove(id)
     .then(data => {
       if (!data) {
         res.status(404).send({
           message: `Cannot delete project with id=${id}. Maybe project was not found!`
         });
       } else {
         res.send({
           message: "project was deleted successfully!"
         });
       }
     })
     .catch(err => {
       res.status(500).send({
         message: "Could not delete project with id=" + id
       });
     });
 };
 
 exports.projectUpdate = (req,res)=>{

     
  Projects.findByIdAndUpdate(
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