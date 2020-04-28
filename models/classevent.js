'use strict';
module.exports = (sequelize, DataTypes) => {
  const classevent = sequelize.define('classevent', {
    classname: DataTypes.STRING,
    classtype: DataTypes.STRING,
    classdate: DataTypes.DATE,
    starttime: DataTypes.STRING,
    endtime: DataTypes.STRING,
    instructorId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {});
  classevent.associate = function(models) {
    // associations can be defined here
    models.classevent.belongsTo(models.location)
    models.classevent.belongsTo(models.instructor)
    models.classevent.belongsToMany(models.user,{
      through: models.class_user,
      onDelete: 'CASCADE'
    })
  };
  return classevent;
};