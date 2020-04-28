'use strict';
module.exports = (sequelize, DataTypes) => {
  const location = sequelize.define('location', {
    centername: DataTypes.TEXT,
    address: DataTypes.TEXT,
    city: DataTypes.TEXT,
    state: DataTypes.TEXT,
    zipcode: DataTypes.INTEGER
  }, {});
  location.associate = function(models) {
    // associations can be defined here
    models.location.hasOne(models.classevent)
  };
  return location;
};