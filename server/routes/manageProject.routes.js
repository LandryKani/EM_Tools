const controller = require("../controller/manageProject.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // route POST /projects
  app.post(
    "/api/createProjects",
    [authJwt.verifyToken],
    controller.createProject
  );
  // route GET /projects
  app.get("/api/listProjects", controller.listProject);
  // route GET /api/EnumerateProject/:id
  app.get("/api/getProject/:id", controller.getProject);
  // route Put /api/updateProject/:id
  app.put("/api/updateProject/:id", controller.updateProject);
  // route Delete /api/deleteProject/:id
  app.delete("/api/deleteProject/:id", controller.deleteProject);

  /**********tasks*********** */

  // route POST /api/CreateTask
  app.post("/api/CreateTask", controller.assignTasks);
  // route Get /api/listTasks
  app.get('/api/listTasks',controller.listTask)
  // route Get /api/getTasks/:id
  app.get('/api/getTasks/:id',controller.getTasks)
  // route Put /api/updateTasks/:id
  app.put("/api/updateTasks/:id", controller.updateTask);
  // route Delete /api/deleteTask/:id
  app.delete("/api/deleteTasks/:id", controller.deleteTask);
};
