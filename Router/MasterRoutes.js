const express = require('express');
const router = express.Router();
const mastercontroller=require("../controller/Mastercontroller")

router.get("/getAll",mastercontroller.getAllData)
module.exports = router;