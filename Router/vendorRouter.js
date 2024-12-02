import express from "express"
const router = express.Router();
import controller from "../controller/vendorcontroller.js";
import JwtMiddleware from "../jwtmiddleware.js";
router.post("/create",JwtMiddleware.checkToken,controller.createvendor)
router.post("/getAll",JwtMiddleware.checkToken,controller.getVendor)
router.post("/getOne",JwtMiddleware.checkToken,controller.getOneVendor)
router.post("/update",JwtMiddleware.checkToken,controller.updatevendor)



const vendorRouter = router;

export default vendorRouter;