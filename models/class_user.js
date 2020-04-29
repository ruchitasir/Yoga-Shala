'use strict';
module.exports = (sequelize, DataTypes) => {
  const class_user = sequelize.define('class_user', {
    classeventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    registerCancel: DataTypes.TEXT
  }, {});
  class_user.associate = function(models) {
    // associations can be defined here
    models.class_user.belongsTo(models.classevent)
    models.class_user.belongsTo(models.user)
  };
  return class_user;
};