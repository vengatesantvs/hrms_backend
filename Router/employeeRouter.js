import express from "express"
const router = express.Router();
import controller from "../controller/employeeController.js";
router.post("/create",controller.creatEmployee)
router.post("/getAll",controller.getEmployee)

const employeeRouter = router;

export default employeeRouter;