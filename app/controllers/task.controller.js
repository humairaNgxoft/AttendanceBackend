
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


exports.taskCreate = (req, res) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    time: req.body.time,

  })
  task.save(task)
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: "task saved"
      })
    }).catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}


exports.taskUpdate = (req, res) => {

  Task.findByIdAndUpdate(
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
