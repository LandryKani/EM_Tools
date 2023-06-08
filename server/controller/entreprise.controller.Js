const db = require("../models");
const Employe = db.employe;
const Role = db.role;
const Entreprise = db.entreprise;
const fs = require("fs");

const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");

exports.createEntreprise = (req, res) => {
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
    fs.writeFileSync(
      __dirname + "/../public/ressources" + temp + ".json",
      req.body.logo
    );
  }

  var file =
    req.body.photo != "" ? "PhotoProfil" + generateId(3) : "defaultValue";
  if (file != "defaultValue") {
    fs.writeFileSync(
      __dirname + "/../public/ressources" + file + ".json",
      req.body.photo
    );
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
    .then((entreprise) => {
      res.status(200).send({
        message: "Entreprise created successfully!",
      });
      var Info = entreprise.id;
      console.log("info:", Info);
      Employe.create({
        photo: file,
        username: req.body.username,
        email: req.body.email,
        tel: req.body.tel,
        password: bcrypt.hashSync(req.body.password, 9),
        entrepriseId: Info
      })
      .then(employe => {
        if (req.body.roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: req.body.roles
              }
            }
          }).then(roles => {
            employe.setRoles(roles).then(() => {
              res.send({ message: "Employe was registed susccessfully!" });
            });
          });
        } else {
          // user role = 1
          employe.setRoles([2]).then(() => {
            res.send({ message: "Employe was registered successfully!" });
          });
    
        }
    
        var  responsable = req.body
        console.log("responsable:", responsable)
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
    })
    .catch((error) => res.status(500).json(error));
};
