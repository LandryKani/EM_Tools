'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projets', 'duree');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('projets', 'duree', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};