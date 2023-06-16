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

  // route GET /projects
  app.get("/api/getProjects", controller.ListProject);
  // route POST /projects
  app.post("/api/createProjects", [authJwt.verifyToken], controller.CreateProject);
  // route GET /projects/:projetId/tasks
  app.get('/api/enumerateTasks/:projetId/tasks', controller.EnumerateTask);
  // route POST /projects/:projetId/tasks
  app.post('/api/assignTasks/:projetId/tasks', controller.AssignTasks);
};
