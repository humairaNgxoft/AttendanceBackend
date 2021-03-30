
module.exports = app => {
    const controller = require("../controllers/project.controller");
    var router = require("express").Router();
    router.get("/:id", controller.findOne)
    router.post("/", controller.projectCreate)
    router.delete("/:id", controller.projectDelete);
    router.put("/:id", controller.projectUpdate);
    module.exports = router
    app.use('/api/project', router);
  };
  
  
  
  
  
  
  
  