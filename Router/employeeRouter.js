import express from "express"
const router = express.Router();
import controller from "../controller/employeeController.js";
import JwtMiddleware from "../jwtmiddleware.js";
router.post("/create",JwtMiddleware.checkToken,controller.creatEmployee)
router.post("/getAll",JwtMiddleware.checkToken,controller.getEmployee)
router.post("/getOne",JwtMiddleware.checkToken,controller.getOneEmployee)
router.post("/update",JwtMiddleware.checkToken,controller.updateEmployee)
router.post("/bulkUpload",controller.bulkCreateEmployee)
router.post("/report",JwtMiddleware.checkToken,controller.EmployeeReport)


const employeeRouter = router;

export default employeeRouter;