'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ElectionAreas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      village: {
        type: Sequelize.STRING
      },
      patwarHalka: {
        type: Sequelize.STRING
      },
      tehsil: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      blockCode: {
        type: Sequelize.STRING
      },
      unionCouncil: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ElectionAreas');
  }
};