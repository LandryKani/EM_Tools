const { verifySignUp } = require("../middleware");
const controller = require("../controller/entreprise.controller.js")
module.exports = function(app){
    app.post(
        "/api/createEntreprise",[
          verifySignUp.checkDuplicateUsernameOrEmail,
          verifySignUp.checkRolesExisted
        ],controller.createEntreprise
      );
}