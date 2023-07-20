const db = require("../models");
const config = require("../config/auth.config");
const {
  employe: Employe,
  role: Role,
  refreshToken: RefreshToken,
  passwordResetToken: PasswordResetToken,
} = db;

const Op = db.Sequelize.Op;
const nodemailer = require("nodemailer");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.signup = (req, res) => {
  // Save User to Database
  Employe.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 9),
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
            res.send({ message: "Employe was registed susccessfully!" });
          });
        });
      } else {
        // user role = 1
        Employe.setRoles([1]).then(() => {
          res.send({ message: "Employe was registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Employe.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then(async (employe) => {
      if (!employe) {
        return res.status(404).send({ message: "Username is invalid!." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        employe.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: employe.id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      let refreshToken = await RefreshToken.createToken(employe);
      // let resetPasswordToken = await ResetPasswordToken.createToken(employe);

      var authorities = [];
      employe.getRoles().then((roles) => {
        console.log("roles:", roles);
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: employe.id,
          username: employe.username,
          email: employe.email,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
          // resetPasswordToken: resetPasswordToken
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getInformation = (req, res, next) => {
  let token = req.headers["x-acces-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided !",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    // req.employeId= decoded.id;
    Employe.findOne({
      where: {
        id: decoded.id,
      },
    }).then((employe)=>{
      var authorities = [];
      employe.getRoles().then((roles) => {
        console.log("roles:", roles);
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: employe.id,
          username: employe.username,
          email: employe.email,
          tel: employe.tel,
          // resetPasswordToken: resetPasswordToken
        });
      });
     
    }) .catch((err) => {
      res.status(500).send({ message: err.message });
    });
    
    
  });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh token is required !" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });

    console.log(refreshToken);

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    const employe = await refreshToken.getEmploye();
    let newAccessToken = jwt.sign({ id: employe.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

exports.sendPasswordResetEmail = (req, res) => {
  const email = req.body.email;

  Employe.findOne({
    where: {
      email: email,
    },
  })
    .then((employe) => {
      if (!employe) {
        // L'employé n'existe pas
        return res.status(422).json({
          errors: [
            { title: "Invalid credentials", detail: "Employe does not exist" },
          ],
        });
      }

      // Génération du token unique et insértion  d'une nouvelle ligne dans la table de tokens
      const token = crypto.randomBytes(20).toString("hex");
      const expiresAt = new Date(Date.now() + 3600000); // Le token expirera dans 1 heures

      PasswordResetToken.create({
        token: token,
        employeeId: employe.id,
        expires_at: expiresAt,
      })
        .then(() => {
          // Envoie de l'e-mail de réinitialisation de mot de passe à l'employé
          const transporter = nodemailer.createTransport({
            // Configuration du serveur SMTP pour envoyer le courrier électronique
            secure: true,
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: "landrykani020@gmail.com",
              pass: "mbkq lihv sxrj ebnp",
            },
          });

          const mailOptions = {
            to: email,
            from: "landrykani020@gmail.com",
            subject: "Password Reset",
            text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            https://192.168.1.237:3005/reset_password/${token}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`,
          };

          transporter.sendMail(mailOptions, (err) => {
            if (err) {
              console.log(err);
              return res.sendStatus(500);
            }

            res.status(200).json({
              message:
                "An email has been sent to your account with password reset instructions",
            });
          });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

exports.resetPassword = (req, res) => {
  const newPassword = req.body.password;
  const token = req.params.token;

  PasswordResetToken.findOne({
    where: {
      token: token,
      expires_at: { [Op.gt]: new Date() },
    },
  })
    .then((tokenRow) => {
      if (!tokenRow) {
        // Token expiré ou invalide
        return res.status(422).json({
          errors: [
            {
              title: "Invalid credentials",
              detail: "Invalid or expired token",
            },
          ],
        });
      }

      Employe.findByPk(tokenRow.employee_id)
        .then((employe) => {
          if (!employe) {
            // Employé inexistant
            return res.status(422).json({
              errors: [
                {
                  title: "Invalid credentials",
                  detail: "Employe does not exist",
                },
              ],
            });
          }

          // Mettre à jour le mot de passe de l'employé
          employe.password = newPassword;

          employe
            .save()
            .then(() => {
              // Supprimer le token de la table de tokens de réinitialisation de mot de passe
              tokenRow.destroy();

              res.status(200).json({
                message: "Password updated successfully",
              });
            })
            .catch((err) => {
              console.error(err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
