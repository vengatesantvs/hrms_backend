import express from "express"
const router = express.Router();
import controller from "../controller/vendorcontroller.js";
router.post("/create",controller.createvendor)
router.post("/getAll",controller.getVendor)
router.post("/getOne",controller.getOneVendor)
router.post("/update",controller.updatevendor)



const vendorRouter = router;

export default vendorRouter;