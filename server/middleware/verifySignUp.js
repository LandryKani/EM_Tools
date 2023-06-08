const db = require("../models")
const ROLES = db.ROLES;
const Employe = db.employe;

checkDuplicateUsernameOrEmail = (req, res, next)=>{
    //check Username
    Employe.findOne({
        where:{
            username: req.body.username
        }
    }).then(employe =>{
        if(employe){
            res.status(400).send({
                message: "Failed! Username is already in use!"
            })
            return;
        }
    })

    // check email
    Employe.findOne({
        where:{
            email: req.body.email
        }
    }).then(employe =>{
        if(employe){
            res.status(400).send({
                message: "Failed! Email is already in use!"
            })
            return;
        }
        next();
    })
}

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        //console.log(ROLES)
        for (let i = 0; i < req.body.roles.length; i++) {
          console.log(ROLES.includes(req.body.roles[i]))
        if (ROLES===req.body.roles[i]) {
            // console.log("role: ",req.body.roles[i])
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };
  
  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;