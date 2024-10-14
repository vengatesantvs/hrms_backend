const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../server');

  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Companies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    
  },{
    
      timestamps: true, 
    
  });

module.exports=Company