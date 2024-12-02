import express from "express"
import controller from "../controller/payrollController.js";
import JwtMiddleware from "../jwtmiddleware.js";
const router = express.Router();
router.post("/uploadAllowance",JwtMiddleware.checkToken,controller.bulkCreateAllowance)
router.post("/uploadDeduction",JwtMiddleware.checkToken,controller.bulkCreateDeductions)
router.post("/uploadFixedDeduction",JwtMiddleware.checkToken,controller.bulkCreateFixedDeductions)


const payRollRouter = router;

export default payRollRouter;