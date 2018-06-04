'use strict';
module.exports = (sequelize, DataTypes) => {
  var role = sequelize.define('role', {
    RowKey: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: DataTypes.INTEGER,
    roleName: DataTypes.STRING,
  }, {
    underscored: true,
    freezeTableName: true,
  });

  return role;
};