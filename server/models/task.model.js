module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('Task', { // Utilisez Task au lieu de tasks
      titre: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      assign_to: { // Utilisez assign_to au lieu de assing_to
        type: Sequelize.STRING,
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