
export default function salutationdatas(sequelize, DataTypes) {
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
  return Salutation

}