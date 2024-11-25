import db from '../models/index.js';



const listpincode = async (req, res) => {
  try {
    const {pincode}=req.body
    const query = `SELECT 
     Pincode, 
        MIN(id) AS id, 
        MIN(DivisionName) AS City, 
        MIN(StateName) AS State 
    FROM pincodes 
    WHERE Pincode  LIKE :pincode
    GROUP BY Pincode
    `;

const result = await db.sequelize.query(query, {
replacements: { pincode: `${pincode}%` }, // Add wildcards here
type: db.Sequelize.QueryTypes.SELECT,
});
    res.status(200).json({
      message: 'get pincode data successfully',
     data:result,
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



 const controller={listpincode}
 export default controller