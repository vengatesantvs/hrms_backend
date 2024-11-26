import express from "express"
const router = express.Router();
import controller from "../controller/vendorcontroller.js";
router.post("/create",controller.createvendor)
router.post("/getAll",controller.getVendor)

const vendorRouter = router;

export default vendorRouter;