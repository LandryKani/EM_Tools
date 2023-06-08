const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require("../models");
const Employe = db.employe;

//expiration token

const {TokenExpiredError} = jwt;

const catchError = (err,res)=>{
  if(err instanceof TokenExpiredError){
    return res.status(401).send({message: "Unauthorized! Acces Token was expired!"})
  }

  return res.status(401).send({message: "Unauthorized!"})
}

verifyToken = (req, res, next)=>{
    let token = req.headers["x-acces-token"];

    if(!token){
        return res.status(403).send({
            message: "No token provided !"
        })
    }

    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return catchError(err,res)
        }
        req.employeId= decoded.id;
        next();
    })

    // return {'x-acces-token': db.employe.accessToken}
}

isAdmin = (req,res,next) =>{
    Employe.findByPk(req.employeId).then(employe=>{
        employe.getRoles().then(roles =>{
            for(let i =0; i< roles.length; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role!"
            })
            return;
        })

    })
}

isDirector = (req, res, next) => {
    Employe.findByPk(req.employeId).then(employe => {
      employe.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "director") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Director Role!"
        });
      });
    });
  };
  
  isDirectorOrAdmin = (req, res, next) => {
    Employe.findByPk(req.employeId).then(employe => {
      employe.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "director") {
            next();
            return;
          }
  
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Require Director or Admin Role!"
        });
      });
    });
  };
  
  const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isDirector: isDirector,
    isDirectorOrAdmin: isDirectorOrAdmin
  };
  module.exports = authJwt;