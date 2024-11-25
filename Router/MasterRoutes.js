import express from 'express'
const router = express.Router();
import controller from '../controller/Mastercontroller.js';
router.get("/getAll",controller.getAllData)

const masterRouter = router;

export default masterRouter;