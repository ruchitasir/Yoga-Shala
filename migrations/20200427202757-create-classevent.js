'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('classevents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classname: {
        type: Sequelize.STRING
      },
      classtype: {
        type: Sequelize.STRING
      },
      classdate: {
        type: Sequelize.DATE
      },
      starttime: {
        type: Sequelize.STRING
      },
      endtime: {
        type: Sequelize.STRING
      },
      instructorId: {
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('classevents');
  }
};