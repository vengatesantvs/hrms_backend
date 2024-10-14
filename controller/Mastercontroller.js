const Company = require('../models/Companies');
const Salutation = require('../models/Salutation');
const {Op} =require("sequelize")


const getAllData = async (req, res) => {
  try {
    const Salutations = await Salutation.findAll(
    {
      attributes: { exclude: ['id','createdAt', 'updatedAt'] },
    });

    const Companies = await Company.findAll(
        {
          attributes: { exclude: ['id','createdAt', 'updatedAt'] },
        });

    res.status(200).json({
      message: 'get data successfully',
       Salutations,
       Companies
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'server error please trry again later',
      error: error.message,
    });
  }
};



module.exports = {
  getAllData
};
