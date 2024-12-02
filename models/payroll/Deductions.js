
export default function deductiondatas(sequelize, DataTypes) {

    const deductions = sequelize.define('deductions', {
      id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
      buld_soc: {
         type: DataTypes.STRING, 
         allowNull: true
         },
      canteen: { 
        type: DataTypes.STRING,
         allowNull: true 
        },
      deepavali_advance: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
      designation: { 
        type: DataTypes.STRING,
         allowNull: false 
        },
      employee_code: {
         type: DataTypes.STRING,
          allowNull: false 
        },
      employee_name: { 
        type: DataTypes.STRING,
         allowNull: false 
        },
      grade: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      income_tax: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      lop_days: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      lwf: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      month: {
         type: DataTypes.STRING,
          allowNull: false 
        },
      oth_bank: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      outlet_code: {
         type: DataTypes.STRING,
          allowNull: false 
        },
      outlet_name: {
         type: DataTypes.STRING,
          allowNull: false 
        },
      salary_advance: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      society: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      special_recovery: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      stores: {
         type: DataTypes.STRING,
          allowNull: true 
        },
      tea_monthly: {
         type: DataTypes.STRING,
          allowNull: true 
        },
    }, {
      timestamps: true,
    });
    return deductions
  };