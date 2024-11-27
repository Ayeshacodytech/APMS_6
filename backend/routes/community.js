const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware');
const prisma = new PrismaClient();
const { z } = require("zod");
const linkify = require('linkifyjs');
const socket = require('../socket')


const newPostSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    content: z.string().min(1, "Content is required"),
    topic: z.string().min(1, "Topic is required"),
});
router.post("/newpost", authMiddleware('student'), async (req, res) => {
    try {
        const authorId = req.userId;
        console.log(authorId);
        const body=req.body;
        console.log(body)
        const validation = newPostSchema.safeParse(body);
        console.log(validation)
        if (!validation.success) {
            return res.status(400).json({
                message: "Incorrect inputs",
                errors: validation.error.issues
            });
        }
        console.log("okay")
        const post = await prisma.community.create({
            data: {
                title:body.title,
                content:body.content,
                authorId,
                topic:body.topic,
            },
        });
        console.log(post)
        res.status(201).json({ post });
    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Failed to create a post", error: error.message });
    }finally {
        await prisma.$disconnect();
    }
});
router.get("/posts", authMiddleware('student'), async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const posts = await prisma.community.findMany({
            skip,
            take: limit,
            include: {
                author: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const totalPosts = await prisma.community.count();

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts,
            posts,
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Failed to fetch posts", error: error.message });
    } finally {
        await prisma.$disconnect();
    }
});
router.post('/:postId/comments', authMiddleware('student'), async (req, res) => {
    const { postId } = req.params;
    const { message } = req.body;
    const { userId } = req;

    if (!message) {
        return res.status(400).send({ error: 'Please provide a message with your comment.' });
    }

    try {
        const post = await prisma.community.findUnique({
            where: { id: postId },
        });

        // Check if the author exists
        const user = await prisma.student.findUnique({
            where: { id: userId },
        });

        if (!post) {
            return res.status(404).send({ error: 'Post not found.' });
        }

        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }

        // Now create the comment
        const comment = await prisma.comments.create({
            data: {
                message,
                authorId: userId,
                postId: postId,
            },
        });
        const mentionedUsernames = linkify.find(message)
            .filter(item => item.type === 'mention')
            .map(item => item.value.split('@')[1]);

        const mentionedUsers = await prisma.student.findMany({
            where: { name: { in: mentionedUsernames } },
            select: { id: true, name: true }
        });

        const notificationPromises = mentionedUsers.map(async (mentionedUser) => {
            if (String(mentionedUser.id) !== String(userId)) {
                const notification = await prisma.notification.create({
                    data: {
                        senderId: userId,
                        receiverId: mentionedUser.id,
                        notificationType: 'mention',
                        date: new Date(),
                        postId: post.id,
                        notificationData: {
                            message: `${user.name} mentioned you in a comment: ${message}`,
                            title: post.title
                        },
                        read: false,
                    },
                });
                console.log("Attempting to emit mention notification...");
                socket.getIO().to(mentionedUser.id).emit('notification', notification);
            }
        });

        if (String(post.userId) !== String(userId)) {
            const commentNotification = await prisma.notification.create({
                data: {
                    senderId: userId,
                    receiverId: post.authorId,
                    notificationType: 'comment',
                    date: new Date(),
                    postId: post.id,
                    notificationData: {
                        message: `${user.name} commented on your post: ${message}`,
                        title: post.title
                    },
                    read: false,
                },
            });
            console.log("Attempting to emit comment notification to post owner...");
            socket.getIO().to(post.userId).emit('notification', commentNotification);
        }
        await Promise.all(notificationPromises);

        res.status(201).send({ ...comment, author: { userId }, commentVotes: [] });

    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;