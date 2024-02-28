'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {}
  Course.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '"Title" is required'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: '"Description" is required'
        }
      }
    },
    estimatedTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: '"Estimated Time" is required'
          }
        }
    },
    materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: '"Materials Needed" is required'
          }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  /* In the Courses model, add a one-to-one association between the Course 
  and User models using the belongsTo() method. */
  Course.associate = (models) => {
    Course.belongsTo(models.User, {
      as: 'user', // alias
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };




  return Course;
};