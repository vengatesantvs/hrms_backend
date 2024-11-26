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
  
    const paddedGrnNo = String(newGrnNo).padStart(6, '0');
    return `${paddedGrnNo}`;
  };
const creatEmployee = async (req, res) => {
    try {
        const generatedcode=await generateEmpCode()
        const  employeecode=`KI${req.body.vendorCode}${generatedcode}`
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
        { vendor_code: { [Op.like]: `%${searchKey}%` } },
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
console.log(data,"data")
    res.status(200).json({
      message: 'vendor data fetched successfully',
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



 const controller={creatEmployee,getEmployee}
 export default controller
