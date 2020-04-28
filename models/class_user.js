'use strict';
module.exports = (sequelize, DataTypes) => {
  const class_user = sequelize.define('class_user', {
    classeventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  class_user.associate = function(models) {
    // associations can be defined here
  };
  return class_user;
};