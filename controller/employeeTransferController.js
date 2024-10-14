const EmployeeTransfer = require('../models/EmployeeTransfer');
const {Op} =require("sequelize")
const mapFields = (data) => {
  return data.map((item) => ({
    Absorption_Transfer_Ltr_No: item['«Absorption_Transfer_Ltr_No»'],
    Relieving_Date: item['«Relieving_Date»'],
    Salutation: item['Salutation'],
    Employee_Name: item['«Employee_Name»'],
    Employee_Code: (item['«Employee_Code»'])?.toString(),
    Current_Designation: item['«Current_Designation»'],
    Current_SBU: item['«Current_SBU»'],
    From_Company: item['«From_Company»'],
    Report_Location_Address: item['«Report_Location_Address»'],
    With_Effect_From: item['«With_Effect_From»'],
    Auth_Sign_Name: item['«Auth_Sign_Name»'],
    Auth_Desig: item['«Auth_Desig»'],
    Absorption_Ltr_No: item['«Absorption_Ltr_No»'],
    Current_Location: item['«Current_Location»'],
    Designation: item['«Designation»'],
    To_Company_Auth_Sign_Name: item['«To_Company_Auth_Sign_Name»'],
    To_Company_Auth_Desig: item['«To_Company_Auth_Desig»'],
    To_Company: item['«To_Company»'],
    Reporting_Location: item['«Reporting location»'],
    HR: item['HR'],
  }));
};

const bulkUpload = async (req, res) => {
  try {
    const employeeTransfers = req.body; // assuming array of objects from the request

    if (!Array.isArray(employeeTransfers) || employeeTransfers.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty data provided.' });
    }

    // Map frontend fields to Sequelize fields
    const mappedData = mapFields(employeeTransfers);

    const existingRecords = await EmployeeTransfer.findAll({
      attributes: ['Employee_Code'],
    });
    const existingEmployeeCodes = existingRecords.map(record => record.Employee_Code);
    const uniqueData = mappedData.filter(item => !existingEmployeeCodes.includes(item.Employee_Code));
   
    // Bulk create employee transfer records
    const result = await EmployeeTransfer.bulkCreate(uniqueData, { validate: true });

    res.status(201).json({
      message: 'Bulk upload successful',
      data: result,
    });
 
  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Bulk upload failed',
      error: error.message,
    });
  }
};

const getdata = async (req, res) => {
  try {
    const {employeeCodes} = req.query; // assuming array of objects from the request
    const arrayofemployeecodes=employeeCodes.split(",")
    console.log(arrayofemployeecodes,"ecode")
    const result = await EmployeeTransfer.findAll({
      attributes: { exclude: ['id','createdAt', 'updatedAt'] },
      where: {
        Employee_Code: {
          [Op.in]: arrayofemployeecodes,
        },
        
      }
    });

    res.status(200).json({
      message: 'get data successfully',
      data: result,
    });
 
  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'server error please trry again later',
      error: error.message,
    });
  }
};

const updatestatus = async (req, res) => {
  try {
    const {body}=req
    const {employeeCodes} = req.query; // assuming array of objects from the request
    const arrayofemployeecodes=employeeCodes.split(",")
    console.log(body,"body")
    const result = await EmployeeTransfer.update(
       body
      ,
      {
      where: {
        Employee_Code: {
          [Op.in]: arrayofemployeecodes,
        },
      }
    }
  );

    res.status(200).json({
      data:result,
      message: 'data update successfully',
    });
 
  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'server error please trry again later',
      error: error.message,
    });
  }
};

const Postdata = async (req, res) => {
  try {
    const body = req.body; // assuming array of objects from the request

   const empcodeexist= await EmployeeTransfer.findOne({where:{Employee_Code:body.Employee_Code}})
   console.log(empcodeexist,"exist")
   let result
   if(empcodeexist){
     result=await EmployeeTransfer.update(body,{where:{Employee_Code:body.Employee_Code}})
   }
   else{
     result = await EmployeeTransfer.create(body, { validate: true });

   }

    res.status(201).json({
      message: 'data posted successful',
      data: result,
    });
 
  
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'data post failed',
      error: error.message,
    });
  }
};

module.exports = {
  bulkUpload,getdata,updatestatus,Postdata
};
