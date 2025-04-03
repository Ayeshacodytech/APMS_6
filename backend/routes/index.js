const express = require("express");
const studentRouter=require("./student");
const adminRouter=require("./admin");
const communityRouter=require("./community");
const notificationRouter=require("./notification");
const teacherRouter=require("./teacher");
const teachercommunityRouter=require("./teachercommunity");
const aptitudeRouter=require("./aptitude");
const gateRouter=require("./gate");
const submissionRouter=require("./submission");
const problemRouter=require("./problem");
const router=express.Router();

router.use("/student",studentRouter);
router.use("/admin",adminRouter);
router.use('/community',communityRouter)
router.use('/aptitude',aptitudeRouter)
router.use('/gate',gateRouter)
router.use('/teacher',teacherRouter)
router.use('/notification',notificationRouter)
router.use('/teacher/community',teachercommunityRouter)
router.use('/submission',submissionRouter)
router.use('/problem',problemRouter)

module.exports = router;
