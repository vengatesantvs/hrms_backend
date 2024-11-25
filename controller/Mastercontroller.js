import db from '../models/index.js';
const Company = db.company
const Salutation = db.salutation


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
       Companies,
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



 const controller={getAllData}
 export default controller
