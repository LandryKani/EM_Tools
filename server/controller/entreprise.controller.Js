const db = require("../models");
const Employe = db.employe;
const Role = db.role;
const Entreprise = db.entreprise;
const fs = require("fs");
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');



const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
let entrepriseId= ""

exports.createEntreprise = (req, res) => {
  console.log("cls", req.body);

  const generateId = (length) => {
    let result = "";
    let tabChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
    let tabCharLength = tabChar.length;
    for (let i = 0; i < length; i++) {
      result += tabChar.charAt(Math.floor(Math.random() * tabCharLength));
    }
    return result;
  };

  var temp =
    req.body.logo != "" ? "LogoEntreprise" + generateId(2) : "defaultLogo";
  if (temp != "defaultLogo") {
    // fs.writeFileSync(
    //   __dirname + "/../public/ressources" + temp + ".json",
    //   req.body.logo
    // );
  }

  var file =
    req.body.photo != "" ? "PhotoProfil" + generateId(3) : "defaultValue";
  if (file != "defaultValue") {
    // fs.writeFileSync(
    //   __dirname + "/../public" + file + ".json",
    //   req.body.photo
    // );
  }
  // create employe

  

  //insert employe during creation of one enterprise

  Entreprise.create({
    nom: req.body.nom,
    domaine: req.body.domaine,
    email: req.body.email,
    tel: req.body.tel,
    logo: temp,
    localisation: req.body.localisation,
  })
    .then(async (entreprise) => {
      // res.status(200).send({
      //   message: "Entreprise created successfully!",
      // });
      entrepriseId = entreprise.id;
      console.log("info:", entrepriseId);
      await Employe.create({
        photo: file,
        username: req.body.username,
        e_mail: req.body.e_mail,
        numtel: req.body.numtel,
        password: bcrypt.hashSync(req.body.password, 9),
        entrepriseId: entrepriseId,
      })
        .then((employe) => {
          if (req.body.roles) {
            Role.findAll({
              where: {
                name: {
                  [Op.or]: req.body.roles,
                },
              },
            }).then((roles) => {
              employe.setRoles(roles).then(() => {
                res
                  .status(200)
                  .send({ message: "Employe was registed susccessfully!" });
                console.log("Employe was registed susccessfully!");
              });
            });
          } else {
            // user role = 1
            employe
              .setRoles([2])
              .then(() => {
                res.send({ message: "Employe was registered successfully!" });
                // console.log("Employe was registed susccessfully!")
              })
              .catch((error) => {
                console.log(error);
              });
          }

          var responsable = req.body;
          console.log("responsable:", responsable);
        })
        .catch((err) => {
          console.log("this isi the error of that message", err);
          res.status(500).send({ message: err.message });
        });
    })
    .catch((error) => {
      console.log("this is the error of the register entreprise", error);
      res.status(500).json(error);
    });
};

exports.createEmploye = async (req, res)=>{
  // const generateId = (length) => {
  //   let result = "";
  //   let tabChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
  //   let tabCharLength = tabChar.length;
  //   for (let i = 0; i < length; i++) {
  //     result += tabChar.charAt(Math.floor(Math.random() * tabCharLength));
  //   }
  //   return result;
  // };

  // var file =
  //   req.body.photo != "" ? "PhotoProfil" + generateId(3) : "defaultValue";
  // if (file != "defaultValue") {
  //   fs.writeFileSync(
  //     __dirname + "/../public" + file + ".json",
  //     req.body.photo
  //   );
  
  await Employe.create({
    username: req.body.username,
    e_mail: req.body.e_mail,
    numtel: req.body.numtel,
    password: bcrypt.hashSync(req.body.password, 9),
    entrepriseId: req.body.entrepriseId,
  })
    .then((employe) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          employe.setRoles(roles).then(() => {
            res
              .status(200)
              .send({ message: "Employe was registed susccessfully!" });
            console.log("Employe was registed susccessfully!");
          });
        });
      } else {
        // user role = 1
        employe
          .setRoles([1])
          .then(() => {
            res.send({ message: "Employe was registered successfully!" });
            // console.log("Employe was registed susccessfully!")
          })
          .catch((error) => {
            console.log(error);
          });
      }

      var responsable = req.body;
      console.log("responsable:", responsable);
    })
    .catch((err) => {
      console.log("this is the error of that message", err);
      res.status(500).send({ message: err.message });
    });
}

exports.listEmploye = async (req, res) => {
  try {
    const employes = await Employe.findAll();
    const employeList = [];
    
    for (let i = 0; i < employes.length; i++) {
      const employe = employes[i];
      const authorities = [];
      
      const roles = await employe.getRoles();
      
      for (let j = 0; j < roles.length; j++) {
        authorities.push(roles[j].name.toUpperCase());
      }
      
      employeList.push({
        id: employe.id,
        username: employe.username,
        e_mail: employe.e_mail,
        numtel: employe.numtel,
        roles: authorities,
      });
    }
    
    res.status(200).send(employeList);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

exports.deleteEmploye= (req,res)=>{
   const EmployeId = req.params
   console.log("id employe a supprimer: ", EmployeId)
   Employe.destroy(
    {
      where:{
        id: EmployeId.id
      }
    }
   ).then(
    ()=>{
      res.status(200).send({msg: "Employe deleted succesfully !!"})
    }
   ).catch((err)=>{
    console.error(err)
    res.status(500).send(err)
   })
}

exports.updateEmploye = (req, res) => {
  const employeId = req.params.id;

  // Récupère les détails de l'employé avant la modification
  Employe.findByPk(employeId)
    .then((employe) => {
      if (!employe) {
        return res.status(404).send({ msg: "Employee not found." });
      }

      // Effectue la mise à jour des détails de l'employé
      Employe.update(req.body, {
        where: {
          id: employeId,
        },
      })
        .then(() => {
          // Récupère les détails de l'employé après la modification
          Employe.findByPk(employeId)
            .then((updatedEmploye) => {
              // Renvoie les détails de l'employé après la modification
              res.status(200).send({...updatedEmploye});
            })
            .catch((err) => {
              console.log(err);
              res.status(500).send(err);
            });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};
exports.updatePersonalInformation = (req,res)=>{
  jwt.verify(req.headers['x-access-token'], config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    // req.employeId= decoded.id;
    Employe.update(req.body,{
      where: {
        id: decoded.id,
      },
    }).then( async (employe)=>{
      console.log("this is the update employer", employe)
      if(employe.length != 0){
        const user = await Employe.findOne({
          where:{
            id:decoded.id
          }
        })
        res.status(200).send({
          id: user.id,
          username: user.username,
          e_mail: user.e_mail,
          numtel: user.numtel,
          // resetPasswordToken: resetPasswordToken
        })
      }
     ;
     
    }) .catch((err) => {
      res.status(500).send({ message: err.message });
    });
    
    
  });
}
