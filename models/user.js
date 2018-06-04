'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    RowKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: DataTypes.STRING,
    password: DataTypes.STRING,
    groupId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
  });

  return user;
};