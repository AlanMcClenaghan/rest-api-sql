'use strict';
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
  return User;
};