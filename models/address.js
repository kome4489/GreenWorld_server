'use strict';
module.exports = (sequelize, DataTypes) => {
  var address = sequelize.define('address', {
    rowkey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    prefecture: DataTypes.STRING,
    city: DataTypes.STRING,
    chome: DataTypes.STRING,
    common: DataTypes.STRING,
    street: DataTypes.STRING,
    coordinate_no: DataTypes.STRING,
    coordinate_x: DataTypes.STRING,
    coordinate_y: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    display_flg: DataTypes.STRING,
    main_flg: DataTypes.STRING,
    upd_prev_flg: DataTypes.STRING,
    upd_newx_flg: DataTypes.STRING,
  }, {
    freezeTableName: true,
  });

  return address;
};