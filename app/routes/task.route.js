
module.exports = app => {
    const controller = require("../controllers/task.controller");
    var router = require("express").Router();
    router.get("/:id", controller.findOne)
    router.post("/", controller.taskCreate)
    router.put("/:id",   controller.taskUpdate);
    router.delete("/:id", controller.taskDelete);
    module.exports = router
    app.use('/api/task', router);
  };
  
  
  
  
  
  
  
  