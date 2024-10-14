const express = require('express');
const router = express.Router();
const employeeTransferController=require("../controller/employeeTransferController")

router.post("/bulkupload",employeeTransferController.bulkUpload)
router.get("/get",employeeTransferController.getdata)
router.post("/update",employeeTransferController.updatestatus)
router.post("/single",employeeTransferController.Postdata)

module.exports = router;