
export default function employeedatas(sequelize, DataTypes) {
    const Employee = sequelize.define('employees', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
     
      aadhar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      esi: {
        type: DataTypes.STRING,
      },
      esiAdmissionDate: {
        type: DataTypes.STRING,
      },
      esicAmount: {
        type: DataTypes.STRING,
      },
      hra: {
        type: DataTypes.STRING, // Storing "5lpa" as string since it's not a numeric value
      },
      ifscNo: {
        type: DataTypes.STRING,
      },
      lwf: {
        type: DataTypes.STRING,
      },
      pf: {
        type: DataTypes.STRING,
      },
      pfAmount: {
        type: DataTypes.STRING,
      },
      pfEligibilityDate: {
        type: DataTypes.STRING,
      },
      pan: {
        type: DataTypes.STRING,
      },
      sbu: {
        type: DataTypes.STRING,
      },
      stb: {
        type: DataTypes.STRING,
      },
      uan: {
        type: DataTypes.STRING,
      },
      accidentalInsurance: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      bankAccountNo: {
        type: DataTypes.STRING,
      },
      bankName: {
        type: DataTypes.STRING,
      },
      basicSalary: {
        type: DataTypes.STRING, 
      },
      bonus: {
        type: DataTypes.STRING,
      },
      category: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      dateOfBirth: {
        type: DataTypes.STRING,
      },
      dateOfJoining: {
        type: DataTypes.STRING,
      },
      department: {
        type: DataTypes.STRING,
      },
      designation: {
        type: DataTypes.STRING,
      },
      emailId: {
        type: DataTypes.STRING,
      },
      fatherName: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      healthInsurance: {
        type: DataTypes.STRING,
      },
      maritalStatus: {
        type: DataTypes.STRING,
      },
      medicalAllowance: {
        type: DataTypes.STRING,
      },
      mobileNo: {
        type: DataTypes.STRING,
        
      },
      employeeName: {
        type: DataTypes.STRING,
      },
      otherAllowance: {
        type: DataTypes.STRING,
      },
      paymentMode: {
        type: DataTypes.STRING,
      },
      pinCode: {
        type: DataTypes.STRING,
       
      },
      professionalTax: {
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      travelAllowance: {
        type: DataTypes.STRING,
      },
      vendorCode: {
        type: DataTypes.STRING,
      },
      vendorEmpCode: {
        type: DataTypes.STRING,
      },
      status:{
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Active"
      },
      empCode:{
        type: DataTypes.STRING,
      }

    },{
      
        timestamps: true, 
      
    });
    return Employee
  
  }