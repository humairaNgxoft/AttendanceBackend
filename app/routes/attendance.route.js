
module.exports = app => {
  const controller = require("../controllers/attendance.controller");
  var router = require("express").Router();
  router.get("/:id", controller.findOne)
  router.post("/", controller.attendanceCreate)
  router.delete("/:id", controller.attendanceDelete);
  router.put("/:id", controller.attendanceUpdate);

  module.exports = router
  app.use('/api/attendance', router);
};







