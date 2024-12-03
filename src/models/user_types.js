'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

  UserType.associate = function (models) {
    UserType.hasMany(models.User, {
      foreignKey: 'user_type_id',
      as: 'users',
    });
  };

  return UserType;
};
