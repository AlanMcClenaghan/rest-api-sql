'use strict';

const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '"First Name" is required'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '"Last Name" is required'
        }
      }
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: '"Email" is required'
          }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: '"Password" is required'
          }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  /* In the Users model, add a one-to-many association between the User 
  and Course models using the hasMany() method. */
  User.associate = (models) => {
    as: 'user', // alias
    User.hasMany(models.Course, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return User;
};