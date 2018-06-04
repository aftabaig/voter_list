'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Voters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      electionAreaId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ElectionAreas',
          key: 'id'
        }
      },
      serialNumber: {
        type: Sequelize.STRING
      },
      familyNumber: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      fatherName: {
        type: Sequelize.STRING
      },
      idCardNumber: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.STRING
      },
      address: {
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
    return queryInterface.dropTable('Voters');
  }
};