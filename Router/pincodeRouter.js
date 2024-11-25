import express from "express"
const router = express.Router();
import controller from "../controller/pincodecontroller.js";
router.post("/list",controller.listpincode)
const pincodeRouter = router;

export default pincodeRouter;