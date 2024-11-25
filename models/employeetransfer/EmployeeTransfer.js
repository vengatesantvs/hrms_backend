export default function employeetransferdatas(sequelize, DataTypes) {
    const EmployeeTransfer = sequelize.define('employeetransfer', {
      Absorption_Transfer_Ltr_No: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Relieving_Date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Salutation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Employee_Code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Current_Designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Current_SBU: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      From_Company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Report_Location_Address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      With_Effect_From: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Auth_Sign_Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Auth_Desig: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Absorption_Ltr_No: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Current_Location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Designation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      To_Company_Auth_Sign_Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      To_Company_Auth_Desig: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      To_Company: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Reporting_Location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      HR: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Absorbtion_Letter:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Not Generated"
      },
    Transfer_Letter:{
      type: DataTypes.STRING,
        allowNull: true,
      defaultValue:"Not Generated"
    }
    },{
        tableName: 'employeetransfer',  
  timestamps: true 
    });
    return EmployeeTransfer
}
    
  