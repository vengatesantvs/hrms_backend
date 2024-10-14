// server.js
const express = require('express');
const { Sequelize } = require('sequelize');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Sequelize setup
 const sequelize = new Sequelize('test', 'root', 'Appadmin@123', {
  host: 'localhost',
  dialect: 'mysql',
});
// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    const userRoutes = require('./Router/userRoutes');
    const employeeTransferRoutes=require("./Router/employeeTransferRoutes")
    const masterRoutes=require("./Router/MasterRoutes")

    console.log('Database connection has been established successfully.');
    app.use(express.json({ limit: '50mb' }));  // You can adjust the limit based on your requirements
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors());

// Routes
app.use('/user', userRoutes);
app.use('/employeetransfer',employeeTransferRoutes)
app.use("/master",masterRoutes)
// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
sequelize.sync()
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
  module.exports= {sequelize}



