// server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const PORT = process.env.PORT;


import userRouter from './Router/userRoutes.js';
import masterRouter from './Router/MasterRoutes.js';
import employeeTransferRouter from './Router/employeeTransferRoutes.js';
import pincodeRouter from './Router/pincodeRouter.js';
import vendorRouter from './Router/vendorRouter.js';
import employeeRouter from './Router/employeeRouter.js';
    app.use(express.json({ limit: '50mb' }));  // You can adjust the limit based on your requirements
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors());

// Routes
app.use('/user', userRouter);
app.use('/employeetransfer',employeeTransferRouter)
app.use("/master",masterRouter)
app.use("/pincode",pincodeRouter)
app.use("/vendor",vendorRouter)
app.use("/employee",employeeRouter)


// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




