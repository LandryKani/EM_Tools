const { authJwt } = require("../middleware");
const controller = require("../controller/employe.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/employe",
    [authJwt.verifyToken],
    controller.employeBoard
  );

  app.get(
    "/api/test/director",
    [authJwt.verifyToken, authJwt.isDirector],
    controller.directorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};