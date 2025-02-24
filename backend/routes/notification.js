const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { authMiddleware } = require("../middleware");

const prisma = new PrismaClient();

// ✅ Get all notifications for a user
router.get("/", authMiddleware('student'), async (req, res) => {
    try {
        const { receiverId } = req.userId;
        const notifications = await prisma.notification.findMany({
            where: { receiverId },
            include: {
                sender: {
                    select: { id: true, name: true, email: true, year: true, department: true }
                },
                post: {
                    select: { id: true, title: true }
                }
            },
            orderBy: { date: "desc" },
        });

        // Reshape response format
        const formattedNotifications = notifications.map((notif) => ({
            id: notif.id,
            senderId: notif.senderId,
            receiverId: notif.receiverId,
            notificationType: notif.notificationType,
            date: notif.date,
            notificationData: notif.notificationData,  // Assuming it's stored as JSON in Prisma
            postId: notif.postId,
            read: notif.read,
            sender: notif.sender,
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