import express from "express"
import controller from "../controller/employeeTransferController.js";
import JwtMiddleware from "../jwtmiddleware.js";
const router = express.Router();
router.post("/bulkupload",JwtMiddleware.checkToken,controller.bulkUpload)
router.post("/get",JwtMiddleware.checkToken,controller.getdata)
router.post("/update",JwtMiddleware.checkToken,controller.updatestatus)
router.post("/single",JwtMiddleware.checkToken,controller.Postdata)

const employeeTransferRouter = router;

export default employeeTransferRouter;