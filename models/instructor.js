'use strict';
module.exports = (sequelize, DataTypes) => {
  const instructor = sequelize.define('instructor', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    qualifications: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  instructor.associate = function(models) {
    // associations can be defined here
    models.instructor.belongsTo(models.user)
    models.instructor.hasMany(models.classevent)
  };
  return instructor;
};