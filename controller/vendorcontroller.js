import db from '../models/index.js';
const vendor = db.vendor
import { Op } from 'sequelize';

const createvendor = async (req, res) => {
    try {
      const data = await vendor.create(req.body);
  
      
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
const getVendor = async (req, res) => {
  try {
    const { searchKey, offset, limit } = req.body;
    console.log(req.body,"body")
    const searchCondition = searchKey ? {
      [Op.or]: [
        { vendor_code: { [Op.like]: `%${searchKey}%` } },
        { first_name: { [Op.like]: `%${searchKey}%` } },
        { last_name: { [Op.like]: `%${searchKey}%` } },

      ]
    } : {};
    const data = await vendor.findAll({
        where: searchCondition ,
        attributes:["id","vendor_code","first_name","last_name","mobile_number","status"],
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



 const controller={createvendor,getVendor}
 export default controller