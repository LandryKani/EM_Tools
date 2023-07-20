const { verifySignUp } = require("../middleware");
const controller = require("../controller/entreprise.controller.js")
module.exports = function(app){
    app.post(
        "/api/createEntreprise",[
          verifySignUp.checkDuplicateUsernameOrEmail,
          verifySignUp.checkRolesExisted
        ],controller.createEntreprise
      );
    app.put("/api/updateEmploye/:id", controller.updateEmploye)
    app.delete("/api/deleteEmploye/:id", controller.deleteEmploye)
    app.post("/api/createEmploye", controller.createEmploye)
}