const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../server');

  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ecode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },{
    
      timestamps: true, 
    
  });

module.exports=User