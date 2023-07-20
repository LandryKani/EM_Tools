module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define("tasks", {
    // Utilisez Task au lieu de tasks
    titre: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    status_tache: {
      type: Sequelize.ENUM,
      values: ["en attente", "en cours", "échouée","terminée"],
      defaultValue: "en attente",
    },
    duree: {
      type: Sequelize.STRING,
    },
    date_debut: {
      type: Sequelize.DATE,
    },
    date_fin: {
      type: Sequelize.DATE,
    },
  });
  return Task;
};
