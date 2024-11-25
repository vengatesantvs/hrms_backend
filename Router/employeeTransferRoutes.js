import express from "express"
import controller from "../controller/employeeTransferController.js";
const router = express.Router();
router.post("/bulkupload",controller.bulkUpload)
router.post("/get",controller.getdata)
router.post("/update",controller.updatestatus)
router.post("/single",controller.Postdata)

const employeeTransferRouter = router;

export default employeeTransferRouter;