module.exports = (sequelize, Sequelize) => {
    const Employe = sequelize.define('employes', { // Utilisez Employe au lieu de employes
      photo: {
        type: Sequelize.BLOB,
      },
      username: {
        type: Sequelize.STRING,
      },
      e_mail: {
        type: Sequelize.STRING,
      },
      numtel: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      }
      // resetToken: {
      //   type: Sequelize.STRING,
      // },
      // resetTokenExpiration: {
      //   type: Sequelize.DATE,
      // },
    });
  
    return Employe;
  };