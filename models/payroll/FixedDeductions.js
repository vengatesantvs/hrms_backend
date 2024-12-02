
export default function fixeddeductiondatas(sequelize, DataTypes) {

    const fixeddeductions = sequelize.define('fixeddeductions', {
      id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          club: { type: DataTypes.STRING, allowNull: true },
          court_recovery: { type: DataTypes.STRING, allowNull: true },
          designation: { type: DataTypes.STRING, allowNull: true },
          employee_code: { type: DataTypes.STRING, allowNull: true },
          employee_name: { type: DataTypes.STRING, allowNull: true },
          from: { type: DataTypes.STRING, allowNull: true },
          grade: { type: DataTypes.STRING, allowNull: true },
          home_loan: { type: DataTypes.STRING, allowNull: true },
          lic: { type: DataTypes.STRING, allowNull: true },
          outlet_code: { type: DataTypes.STRING, allowNull: true },
          outlet_name: { type: DataTypes.STRING, allowNull: true },
          tea: { type: DataTypes.STRING, allowNull: true },
          to: { type: DataTypes.STRING, allowNull: true },
          union: { type: DataTypes.STRING, allowNull: true },
          ymba: { type: DataTypes.STRING, allowNull: true },
    }, {
      timestamps: true, 
    });
    return fixeddeductions
    }
    
    