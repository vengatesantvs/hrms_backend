import express from "express"
const router = express.Router();
import controller from "../controller/usercontroller.js";
import JwtMiddleware from "../jwtmiddleware.js";
router.post("/signup",controller.signup)
router.post("/login",controller.login)
router.post('/menuList',JwtMiddleware.checkToken, controller.menuList);

const userRouter = router;

export default userRouter;