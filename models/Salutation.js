const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../server');

  const Salutation = sequelize.define('Salutation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Salutations: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    
  },{
    
      timestamps: true, 
    
  });

module.exports=Salutation