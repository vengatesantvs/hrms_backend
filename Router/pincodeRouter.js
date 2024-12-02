import express from "express"
const router = express.Router();
import controller from "../controller/pincodecontroller.js";
import JwtMiddleware from "../jwtmiddleware.js";
router.post("/list",JwtMiddleware.checkToken,controller.listpincode)
const pincodeRouter = router;

export default pincodeRouter;