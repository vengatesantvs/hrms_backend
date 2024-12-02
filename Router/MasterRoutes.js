import express from 'express'
const router = express.Router();
import controller from '../controller/Mastercontroller.js';
import JwtMiddleware from '../jwtmiddleware.js';
router.get("/getAll",JwtMiddleware.checkToken,controller.getAllData)

const masterRouter = router;

export default masterRouter;