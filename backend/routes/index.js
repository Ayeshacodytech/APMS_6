const express = require("express");
const studentRouter=require("./student");
const adminRouter=require("./admin");
const router=express.Router();

router.use("/student",studentRouter);
router.use("/admin",adminRouter)
module.exports = router;