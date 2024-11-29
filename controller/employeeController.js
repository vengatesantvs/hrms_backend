import db from '../models/index.js';
const employee = db.employee
import { Op } from 'sequelize';
import excel from 'exceljs';

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
        // { employeeName: { [Op.like]: `%${searchKey}%` } },

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

const EmployeeReportService = async (reqData) => {
  try {
    const {  fromDate, toDate,vendorCode } = reqData;

    const dateCondition =  { createdAt: { [Op.between]: [fromDate, toDate] } } 
    let result = await employee.findAll({
      where: {
        vendorCode:vendorCode,
        ...dateCondition, // Add the date filter condition
      },
     
    
      raw:true
    });
   
    return result;
  } catch (err) {
    console.error('employee Search fetching error', err);
  }
};

const EmployeeReport = async (req, res , next) => {   
  let data={}
  try{ 
    data= await EmployeeReportService(req.body);
   console.log(data,"data")
   if (!data || data.length === 0) {
    res.status(500).json({ message: "No records found for the given criteria." });
    return;
  }
   const responsedata=data.map((item)=>{
    // const date=new Date(item.invoice_date).toISOString()
    const createdDate=(item.createdAt).toISOString()

    // const dateformat=date.slice(8,10)+"-"+date.slice(5,7)+"-"+date.slice(0,4)
    const createddateformat=createdDate.slice(8,10)+"-"+createdDate.slice(5,7)+"-"+createdDate.slice(0,4)


    return(
      {
      ...item,
      createdAt:createddateformat
    }
  )
   })
    
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet("Employee Report");
    const headers=["SL NO",...Object.keys(responsedata[0])]
     const rowData = [headers, ...responsedata.map((item,index)=>([index+1,...Object.values(item)]))];
    rowData.forEach((row) => worksheet.addRow(row));
  
    // Dynamically calculate and set column widths
    worksheet.columns = headers.map((header, colIndex) => {
      const maxLength = rowData.reduce((max, row) => {
        const cellValue = row[colIndex] ? row[colIndex].toString() : ""; // Ensure value is string
        return Math.max(max, cellValue.length);
      }, header.length); // Start with the header length
  
      return {
        header,
        key: header.toLowerCase(),
        width: maxLength + 5, // Add some padding for better appearance
      };
    });
  
    // Style the header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "11164b" },
      };
      cell.alignment = { horizontal: "center" };
    });
  
    // Send File as Response
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=EmployeeReport.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
  
    await workbook.xlsx.write(res);
    res.end()
   
   } catch (err) {
       console.error('employee Contrller Error:', err);
   next(err);
   }
   }

 const controller={creatEmployee,getEmployee,getOneEmployee,updateEmployee,bulkCreateEmployee,EmployeeReport}
 export default controller
