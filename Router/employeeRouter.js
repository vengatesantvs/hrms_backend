import express from "express"
const router = express.Router();
import controller from "../controller/employeeController.js";
router.post("/create",controller.creatEmployee)
router.post("/getAll",controller.getEmployee)
router.post("/getOne",controller.getOneEmployee)
router.post("/update",controller.updateEmployee)
router.post("/bulkUpload",controller.bulkCreateEmployee)
router.post("/report",controller.EmployeeReport)


const employeeRouter = router;

export default employeeRouter;