import db from '../models/index.js';
const employee = db.employee
import { Op } from 'sequelize';

const generateEmpCode = async () => {
  
    // Get the last GRN with the same document type
    const lastGrn = await employee.findOne({
      order: [['createdAt', 'DESC']],
    });
  
    let newGrnNo = 1;
    console.log(lastGrn, 'lastgrn');
    if (lastGrn) {
      const lastGrnNo = lastGrn?.dataValues?.empCode?.slice(4);
      newGrnNo = parseInt(lastGrnNo, 10) + 1;
    }
  
    return newGrnNo;
  };
const creatEmployee = async (req, res) => {
    try {
        const generatedcode=await generateEmpCode()
        const paddedNo = String(generatedcode).padStart(6, '0');
        const  employeecode=`KI${req.body.vendorCode}${paddedNo}`
        const datavalue={...req.body,empCode:employeecode}
      const data = await employee.create(datavalue);
  
      
      res.status(200).json({
        message: 'vendor created successfully',
         data,
         requestSuccessful:true
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'server error please trry again later',
        error: error.message,
        requestSuccessful:false
      });
    }
  };
const getEmployee = async (req, res) => {
  try {
    const { searchKey, offset, limit } = req.body;
    console.log(req.body,"body")
    const searchCondition = searchKey ? {
      [Op.or]: [
        { vendorCode: { [Op.like]: `%${searchKey}%` } },
        { empCode: { [Op.like]: `%${searchKey}%` } },
        { employeeName: { [Op.like]: `%${searchKey}%` } },

      ]
    } : {};
    const data = await employee.findAll({
        where: searchCondition ,
        attributes:["id","vendorCode","employeeName","empCode","status"],
        order: [[db.Sequelize.col('createdAt'), 'DESC']], // Correct order clause
        limit,
        offset,
    });
    const count=await employee.count()
console.log(data,"data")
    res.status(200).json({
      message: 'employee data fetched successfully',
      data,
      count,
      requestSuccessful:true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'server error please trry again later',
      error: error.message,
      requestSuccessful:false
    });
  }
};

const getOneEmployee = async (req, res) => {
  try {
   
    const data = await employee.findByPk(req.body.id);
console.log(data,"data")
    res.status(200).json({
      message: 'employee data fetched successfully',
      data,
      requestSuccessful:true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'server error please trry again later',
      error: error.message,
      requestSuccessful:false
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id, reqdata } = req.body; // Destructure `id` and `data` from `req.body`
    const data = await employee.update(reqdata,{where:{id:id}});
    res.status(200).json({
      message: 'employee updated successfully',
       data,
       requestSuccessful:true
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'server error please trry again later',
      error: error.message,
      requestSuccessful:false
    });
  }
};

const bulkCreateEmployee = async (req, res) => {
  try {
    const employees = req.body; // Expecting an array of employee data
    const createdEmployees = [];
    const generatedCode = await generateEmpCode();
    for (let i = 0; i < employees.length; i++) {
      // Generate unique employee code
      const newNo=generatedCode+i
      const paddedNo = String(newNo).padStart(6, '0');
      const employeeCode = `KI${employees[i].vendorCode}${paddedNo}`;

      // Add empCode to the employee data
      const dataValue = { ...employees[i], empCode: employeeCode };

      // Create employee record in the database
      const createdEmployee = await employee.create(dataValue);
      createdEmployees.push(createdEmployee);
    }

    res.status(200).json({
      message: 'Employees created successfully',
      data: createdEmployees,
      requestSuccessful: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error, please try again later',
      error: error.message,
      requestSuccessful: false,
    });
  }
};

 const controller={creatEmployee,getEmployee,getOneEmployee,updateEmployee,bulkCreateEmployee}
 export default controller
