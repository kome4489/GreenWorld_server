'use strict';
module.exports = (sequelize, DataTypes) => {
  var plant = sequelize.define('plant', {
    RowKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    family: DataTypes.STRING,
    form: DataTypes.STRING,
    path: DataTypes.INTEGER
  }, {
    freezeTableName: true,
  });

  return plant;
};