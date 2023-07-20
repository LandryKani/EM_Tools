const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controller/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/getInformation",[authJwt.verifyToken],controller.getInformation)
  app.post("/api/auth/refreshtoken", controller.refreshToken);
  app.post('/api/reset-password/email',controller.sendPasswordResetEmail)
  app.post('/api/reset-password/:resetToken',controller.resetPassword)
};