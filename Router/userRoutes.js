import express from "express"
const router = express.Router();
import controller from "../controller/usercontroller.js";
router.post("/signup",controller.signup)
router.post("/login",controller.login)
const userRouter = router;

export default userRouter;