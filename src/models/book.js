'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {

    static associate(models) {

      Book.hasMany(models.Loan, {
        foreignKey: 'book_id',
        as: 'loans',
      });
    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      publication_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      times_rented: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'Books',
      timestamps: true,
    }
  );

  return Book;
};
