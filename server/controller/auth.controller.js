const db = require("../models");
const config = require("../config/auth.config");
const { employe: Employe, role: Role, refreshToken: RefreshToken, resetPasswordToken: ResetPasswordToken } = db;

const Op = db.Sequelize.Op;
const nodemailer= require('nodemailer')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require('crypto')

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


exports.resetPasswordToken = async (req, res) => {
  const {email} = req.body;
  try {
    const employe= await Employe.findOne({
      where : {email}
    })

    if(!employe){
      return res.status(404).send('Employe not found')
    }

    const token = crypto.randomBytes(20).toString('hex');
    const expiryDate = new Date(Date.now()+3600000)//1 heure

    employe.resetToken = token
    employe.resetTokenExpiration = expiryDate;
    await employe.save()

    // let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      secure: true,
      host: 'smtp.gmail.com',
      port: 465,
      auth:{
        user: 'landrykani020@gmail.com',
        pass: 'mbkq lihv sxrj ebnp'
      }
    })

    console.log("données:",transporter)

    const mailOptions ={
      from: 'landrykani020@gmail.com',
      to: email,
      subject: 'Password reset request',
      text: 'please click on this link to reset your password: http://192.168.1.237:3005/reset-password/${token}'
    };

    transporter.sendMail(mailOptions,(err,info)=>{
      if (err) {
        console.log(err);
        return res.status(500).send('internal servor error')
      }else{
        console.log(info)
        return res.status(200).send('Password reset email sent')
      }
    }) 
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: "erreur interne du serveur !" });
  }
  
  
};
