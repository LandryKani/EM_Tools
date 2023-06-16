module.exports = (sequelize, Sequelize) => {
  const Projet = sequelize.define("projet", {
    titre: {
      type: Sequelize.STRING,
    },
    description:{
        type: Sequelize.STRING,
    },
    duree: {
      type: Sequelize.STRING,
    },
    dateDebut: {
      type: Sequelize.DATE,
    },
    dateFin: {
      type: Sequelize.DATE,
    },
  });
  return Projet;
};
