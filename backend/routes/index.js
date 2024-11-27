const express = require("express");
const studentRouter=require("./student");
const adminRouter=require("./admin");
const communityRouter=require("./community");
const router=express.Router();

router.use("/student",studentRouter);
router.use("/admin",adminRouter)
router.use("/community",communityRouter)
module.exports = router;