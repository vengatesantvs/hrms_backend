export default function companydatas(sequelize, DataTypes) {
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
  return Company

}