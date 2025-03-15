const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authMiddleware } = require("../middleware");

const prisma = new PrismaClient();

// ✅ Get all notifications for a user
router.get("/student", authMiddleware('student'), async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            
            where: { receiverId: req.userId },
            include: {
                sender: {
                    select: { id: true, name: true, email: true, year: true, department: true }
                },
                post: {
                    select: { id: true, title: true }
                },
                teachersender:{
                    select: { id: true, name: true, email: true, department: true }
                },
            },
            orderBy: { date: "desc" },
        });

        // Reshape response format
        const formattedNotifications = notifications.map((notif) => ({
            id: notif.id,
            senderId: notif.senderId,
            notificationType: notif.notificationType,
            date: notif.date,
            notificationData: notif.notificationData,  // Assuming it's stored as JSON in Prisma
            postId: notif.postId,
            read: notif.read,
            sender: notif.sender,
            teachersender: notif.teachersender,
            post: notif.post
        }));

        res.json(formattedNotifications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});
// Teacher notifications route
router.get("/teacher", authMiddleware('teacher'), async (req, res) => {
    try {
        const { teacherreceiverId } = req.userId;
        const notifications = await prisma.notification.findMany({
            where: { teacherreceiverId: req.userId },
            include: {
                sender: {
                    select: { id: true, name: true, email: true, year: true, department: true }
                },
                post: {
                    select: { id: true, title: true }
                },
                teachersender:{
                    select: { id: true, name: true, email: true, department: true }
                },
            },
            orderBy: { date: "desc" },
        });

        // Reshape response format for teacher notifications
        const formattedNotifications = notifications.map((notif) => ({
            id: notif.id,
            // teacher-specific field
            teacherreceiverId: notif.teacherreceiverId,
            notificationType: notif.notificationType,
            date: notif.date,
            notificationData: notif.notificationData,  // Assuming it's stored as JSON in Prisma
            postId: notif.postId,
            read: notif.read,
            sender: notif.sender,
            teachersender: notif.teachersender,
            post: notif.post
        }));

        res.json(formattedNotifications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
});

router.patch("/:id/read", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedNotification = await prisma.notification.update({
            where: { id },
            data: { read: true },
        });

        res.json(updatedNotification);
    } catch (error) {
        res.status(500).json({ error: "Failed to mark notification as read" });
    }
});

module.exports = router;
