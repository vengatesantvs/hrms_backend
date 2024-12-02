import db from '../models/index.js';
const allowance = db.allowances
const deduction=db.deductions
const fixeddeduction=db.fixeddeductions
const bulkCreateAllowance = async (req, res) => {
    try {
      const allowances = req.body; // Expecting an array of employee data
        const data = await allowance.bulkCreate(allowances);
  
      res.status(200).json({
        message: 'Allowance Uploaded successfully',
        data,
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

  const bulkCreateDeductions = async (req, res) => {
    try {
      const deductions = req.body; // Expecting an array of employee data
        const data = await deduction.bulkCreate(deductions);
  
      res.status(200).json({
        message: 'Deductions uploaaded successfully',
        data,
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

  const bulkCreateFixedDeductions = async (req, res) => {
    try {
      const fixeddeductions = req.body; // Expecting an array of employee data
      console.log(fixeddeductions,"body")
        const data = await fixeddeduction.bulkCreate(fixeddeductions);
  
      res.status(200).json({
        message: 'Fixed Deductions uploaaded successfully',
        data,
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

  const controller={bulkCreateAllowance,bulkCreateDeductions,bulkCreateFixedDeductions}

  export default controller