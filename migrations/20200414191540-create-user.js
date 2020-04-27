'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.TEXT
      },
      username: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      pic:{
        type: Sequelize.STRING,
        defaultValue:'http://placekitten.com/200/200'
      },
      address:{
        type: Sequelize.TEXT
      },
      city:{
        type: Sequelize.TEXT
      },
      state:{
        type: Sequelize.TEXT
      },
      zipcode: {
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
    return queryInterface.dropTable('users');
  }
};