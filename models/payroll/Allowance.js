
export default function allowancedatas(sequelize, DataTypes) {

const allowance = sequelize.define('allowances', {
  id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  employeeCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employeeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attInc: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ATT-INC',
  },
  delIncentive: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  disturbAllow: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  month: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nial: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otHours: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otherEarning: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  outletCode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  outletName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pinnacleIncentive: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pli: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  satSunAllowance: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  splIncentive: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, 
});
return allowance
}

