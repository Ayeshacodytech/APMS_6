const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middleware');
const prisma = new PrismaClient();
const { z } = require("zod");
const linkify = require('linkifyjs');
const socket = require('../socket');
const multer = require('multer');
const cloudinary = require("cloudinary").v2;
require('dotenv').config();
const streamifier = require("streamifier");

const newPostSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 characters"),
    content: z.string().min(1, "Content is required"),
    topic: z.string().min(1, "Topic is required"),
});
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Multer setup - Use memory storage
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 1000 * 1024 * 1024 }, // 10MB limit
});

// Upload Image Route
router.post("/upload-image", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded" });
        }

        // Log req.file to check the file data
        console.log("Uploaded file:", req.file);

        // Check if the file is a base64 string
        if (req.file.mimetype === "image/png" || req.file.mimetype === "image/jpeg") {
            console.log("Image type:", req.file.mimetype);
        } else {
            console.log("Uploaded file is not a valid image format");
        }

        const stream = cloudinary.uploader.upload_stream(
            { folder: "blog_images" },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return res.status(500).json({ message: "Image upload failed" });
                }

                // Log result to ensure you are receiving the secure URL
                console.log("Cloudinary upload result:", result);

                // Send response with Cloudinary image URL
                res.status(200).json({ imageUrl: result.secure_url });
            }
        );

        // Upload the image buffer to Cloudinary
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    } catch (error) {
        console.error("Image upload failed:", error);
        res.status(500).json({ message: "Failed to upload image", error: error.message });
    }
});
router.post("/newpost", authMiddleware('teacher'), async (req, res) => {
    try {
        const teacherId = req.userId;
        console.log(teacherId);
        const body = req.body;
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
                title: body.title,
                content: body.content,
                teacherId,
                topic: body.topic,
            },
        });
        console.log(post)
        res.status(201).json({ post });
    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ message: "Failed to create a post", error: error.message });
    } finally {
        await prisma.$disconnect();
    }
});
router.get("/posts", authMiddleware('teacher'), async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const posts = await prisma.community.findMany({
            skip,
            take: limit,
            include: {
                teacher: true,
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
router.get("/myposts", authMiddleware('teacher'), async (req, res) => {
    try {
        // Get the user ID from the authenticated user
        const { userId } = req;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch posts by the logged-in user
        const posts = await prisma.community.findMany({
            where: {
                teacherId: userId, // Filter posts by the logged-in user
            },
            skip,
            take: limit,
            include: {
                author: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const totalPosts = await prisma.community.count({
            where: {
                teacherId: userId, // Count posts by the logged-in user
            },
        });

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

router.get('/posts/:postId', authMiddleware('teacher'), async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId; // Get the current logged-in user

    try {
        const post = await prisma.community.findUnique({
            where: { id: postId },
            include: {
                teacher: {
                    select: { id: true, name: true, email: true }
                },
                author: {
                    select: { id: true, name: true, email: true }
                },
                comments: {
                    include: {
                        author: { select: { id: true, name: true, email: true } },
                        teacher: { select: { id: true, name: true, email: true } },
                        likes: {
                            include: {
                                user: { select: { id: true, name: true } },
                                teacher: { select: { id: true, name: true } }
                            }
                        },
                        replies: {
                            include: {
                                author: { select: { id: true, name: true } },
                                teacher: { select: { id: true, name: true } },
                                likes: {
                                    include: {
                                        user: { select: { id: true, name: true } },
                                        teacher: { select: { id: true, name: true } }
                                    }
                                }
                            }
                        }
                    }
                },
                likes: {
                    include: {
                        user: { select: { id: true, name: true } },
                        teacher: { select: { id: true, name: true } }
                    }
                },
                PostLike: {  // If likes are stored in this model
                    include: {
                        user: { select: { id: true, name: true } },
                        teacher: { select: { id: true, name: true } }
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Extracting users who liked the post
        // Extract liked users and teachers from the likes array
        const likedUsers = post.likes.map(like => like.user);
        const likedTeachers = post.likes.map(like => like.teacher);

        // Extract liked users and teachers from the PostLike array (if it exists)
        const likedUsersFromPostLike = post.PostLike ? post.PostLike.map(like => like.user) : [];
        const likedTeachersFromPostLike = post.PostLike ? post.PostLike.map(like => like.teacher) : [];

        // Combine all users and teachers into a single array
        const allLikedEntities = [
            ...likedUsers,
            ...likedTeachers,
            ...likedUsersFromPostLike,
            ...likedTeachersFromPostLike
        ].filter(entity => entity !== null); // Ensure no null values are included

        // Check if the current user (student or teacher) has liked the post
        const hasLiked = allLikedEntities.some(entity => entity.id === userId);

        // Use allLikedEntities as the combined liked data
        res.status(200).json({
            ...post,
            likedEntities: allLikedEntities, // All users and teachers who liked the post
            hasLiked
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/posts/:postId/likes', authMiddleware('teacher'), async (req, res) => {
    const { postId } = req.params;
    const { userId } = req; // Assuming user ID is available in req.user

    try {
        // Find post along with likes and user details
        const post = await prisma.community.findUnique({
            where: { id: postId },
            include: {

                likes: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        teacher: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Extract users who liked the post
        // Extract liked users and teachers from the likes array
        const likedUsers = post.likes.map(like => like.user);
        const likedTeachers = post.likes.map(like => like.teacher);

        // Extract liked users and teachers from the PostLike array (if it exists)
        const likedUsersFromPostLike = post.PostLike ? post.PostLike.map(like => like.user) : [];
        const likedTeachersFromPostLike = post.PostLike ? post.PostLike.map(like => like.teacher) : [];

        // Combine all users and teachers into a single array
        const allLikedEntities = [
            ...likedUsers,
            ...likedTeachers,
            ...likedUsersFromPostLike,
            ...likedTeachersFromPostLike
        ].filter(entity => entity !== null); // Ensure no null values are included

        // Check if the current user (student or teacher) has liked the post
        const hasLiked = allLikedEntities.some(entity => entity.id === userId);

        // Use allLikedEntities as the combined liked data
        res.status(200).json({
            ...post,
            likedEntities: allLikedEntities, // All users and teachers who liked the post
            hasLiked
        });

    } catch (error) {
        console.error('Error retrieving likes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { cursor, limit = 10 } = req.query;

    try {
        const post = await prisma.community.findUnique({
            where: { id: postId },
            select: {
                id: true,
                comments: {
                    take: parseInt(limit),
                    skip: cursor ? 1 : 0,
                    cursor: cursor ? { id: cursor } : undefined,
                    include: {
                        author: {
                            select: { id: true, name: true }
                        },
                        replies: {
                            take: 3,
                            include: {
                                author: {
                                    select: { id: true, name: true }
                                }
                            }
                        },
                        _count: {
                            select: { replies: true }
                        }
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const nextCursor = post.comments.length === parseInt(limit) ? post.comments[post.comments.length - 1].id : null;

        const totalComments = post.comments.reduce((count, comment) => count + 1 + comment._count.replies, 0);

        res.status(200).json({ comments: post.comments, totalComments, nextCursor });
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Delete a post post
router.delete('/post/:postId', authMiddleware('teacher'), async (req, res) => {
    const { postId } = req.params;
    const { userId } = req;

    try {
        const post = await prisma.community.findUnique({
            where: {
                id: postId,
            },
            include: {
                teacher: true,
            },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.teacherId !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this post' });
        }
        console.log(postId)
        await prisma.community.delete({
            where: {
                id: postId,
            },
        });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/:postId/comments', authMiddleware('teacher'), async (req, res) => {
    const { postId } = req.params;
    const { message } = req.body;
    const { userId } = req;

    if (!message) {
        return res.status(400).send({ error: 'Please provide a message with your comment.' });
    }

    try {
        // Retrieve the post with both teacher and author objects.
        const post = await prisma.community.findUnique({
            where: { id: postId },
            select: {
                id: true,
                title: true,
                teacher: { select: { id: true, name: true } },
                author: { select: { id: true, name: true } }
            }
        });

        // Check if the teacher (the sender) exists.
        const user = await prisma.teacher.findUnique({
            where: { id: userId },
            select: { id: true, name: true }
        });

        if (!post) {
            return res.status(404).send({ error: 'Post not found.' });
        }

        if (!user) {
            return res.status(404).send({ error: 'User not found.' });
        }

        // Create the comment.
        const comment = await prisma.comments.create({
            data: {
                message,
                teacherId: userId,
                postId: postId,
            },
        });

        // Prepare an array for notifications.
        const notificationPromises = [];

        // Notify the post owner if a teacher is associated.
        if (post.teacher && (post.teacher.id !== userId)) {
            const teacherNotification = prisma.notification.create({
                data: {
                    teachersenderId: userId,
                    teacherreceiverId: post.teacher.id,
                    notificationType: 'comment',
                    date: new Date(),
                    postId: postId,
                    notificationData: {
                        message: `1 Prof ${user.name} commented on your post.`,
                        title: post.title // or you might use post.title if that field is available 
                    },
                    read: false,
                }
            });
            notificationPromises.push(teacherNotification);
            socket.getIO().to(post.teacher.id).emit('notification', teacherNotification);
        }

        // Notify the author of the post if available.
        // Notify the author of the post if available and if the sender isn't the author.
        if (post.author && post.author.id && post.author.id !== userId) {
            const authorNotification = await prisma.notification.create({
                data: {
                    teachersenderId: userId,  // since sender is a teacher
                    receiverId: post.author.id,
                    notificationType: 'comment',
                    date: new Date(),
                    postId: postId,
                    notificationData: {
                        message: `Prof. ${user.name} commented on your post.`,
                        title: post.title   // adjust as needed with post.title or similar field
                    },
                    read: false,
                }
            });
            notificationPromises.push(authorNotification);

            // Emit the notification after creation
            socket.getIO().to(post.author.id).emit('notification', authorNotification);
        }


        // Wait for notification creations to complete if required (optional).
        await Promise.all(notificationPromises);

        // Return a unified response.
        return res.send({ comment, success: true, message: 'Comment created and notifications sent.' });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Like a post
router.post('/likes/post/:postId', authMiddleware('teacher'), async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req;
        const currentUser = await prisma.teacher.findUnique({
            where: { id: userId },
            select: { id: true, name: true },
        });
        const post = await prisma.community.findUnique({
            where: {
                id: postId
            },
            select: {
                id: true, teacherId: true, authorId: true
            }
        })
        const like = await prisma.postLike.findFirst({
            where: {
                postId: postId,
                teacherId: userId,
            },
            select: {
                id: true,
            },
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        console.log(userId)

        if (like) {
            await prisma.postLike.delete({
                where: {
                    id: like.id,
                },
            });
            return res.send({ success: true, message: 'Comment unliked' });
        } else {
            console.log(postId)
            console.log(userId)
            await prisma.postLike.create({
                data: {
                    postId,
                    teacherId: userId,
                },
            });
            if (post.teacherId && (post.teacherId !== userId)) {
                const notification = await prisma.notification.create({
                    data: {
                        teachersenderId: userId,
                        teacherreceiverId: post.teacherId,
                        notificationType: 'like',
                        date: new Date(),
                        postId: postId,
                        notificationData: {
                            message: `Prof. ${currentUser.name} liked your post`,
                            title: post.title
                        },
                        read: false,
                    }
                })
                console.log('Initiating emit');
                socket.getIO().to(post.teacherId).emit('notification', notification)
                console.log('Emit successfull')
                return res.send({ success: true, message: 'Comment liked' });
            }
            if (post.authorId) {
                const notification = await prisma.notification.create({
                    data: {
                        teachersenderId: userId,
                        receiverId: post.authorId,
                        notificationType: 'like',
                        date: new Date(),
                        postId: postId,
                        notificationData: {
                            message: `Prof. ${currentUser.name} liked your post`,
                            title: post.title
                        },
                        read: false,
                    }
                })
                console.log('Initiating emit');
                socket.getIO().to(post.teacherId).emit('notification', notification)
                console.log('Emit successfull')
                return res.send({ success: true, message: 'Comment liked' });
            }
        }
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/reply/:commentId', authMiddleware('teacher'), async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req;
        const { message } = req.body;

        if (!message) {
            return res.status(400).send({ error: 'Please provide a message' });
        }

        if (!commentId) {
            return res.status(400).send({ error: 'Please provide the comment id' });
        }
        const comment = await prisma.comments.findUnique({
            where: { id: commentId },
            select: {
                id: true,
                postId: true,
                post: { select: { id: true, title: true, authorId: true, teacherId: true } },
                teacher: { select: { id: true, name: true } },
                author: { select: { id: true, name: true } }
            }
        })
        if (!comment) {
            return res.status(404).send({ error: 'Comment not found' });
        }
        const [post, currentUser] = await Promise.all([
            prisma.community.findUnique({
                where: { id: comment.postId },
                select: { id: true, teacherId: true, title: true, authorId: true }
            }),
            prisma.teacher.findUnique({
                where: { id: userId },
                select: { id: true, name: true }
            })
        ]);

        const commentAuthor = comment.author?.name
        const commentAuthorId = comment.author?.id;
        const commentTeacher = comment.teacher?.name
        const commentTeacherId = comment.teacher?.id;

        const replyContent = `${message}`;
        await prisma.commentReply.create({
            data: {
                message: replyContent,
                teacherId: userId,
                parentCommentId: commentId
            }
        });

        const notificationPromises = [];
        const postAuthorId = post.authorId
        const postTeacherId = post.teacherId

        if (commentAuthorId && commentAuthorId !== postAuthorId) {
            const notification = prisma.notification.create({
                data: {
                    teachersenderId: userId,
                    receiverId: commentAuthorId,
                    notificationType: 'reply',
                    date: new Date(),
                    postId: post.id,
                    notificationData: {
                        message: `Prof. ${currentUser.username} replied: ${replyContent}`,
                        title: post.title
                    },
                    read: false
                }
            });

            notificationPromises.push(notification);
            socket.getIO().to(commentAuthorId).emit('notification', notification);
        }
        if (commentTeacherId && commentTeacherId !== postTeacherId) {
            const notification = prisma.notification.create({
                data: {
                    teachersenderId: userId,
                    teacherreceiverId: commentTeacherId,
                    notificationType: 'reply',
                    date: new Date(),
                    postId: post.id,
                    notificationData: {
                        message: `Prof. ${currentUser.name} replied: ${replyContent}`,
                        title: post.title
                    },
                    read: false
                }
            });

            notificationPromises.push(notification);
            socket.getIO().to(commentTeacherId).emit('notification', notification);
        }
        if (postAuthorId && commentAuthorId && (commentAuthorId === postAuthorId)) {
            const commentNotification = prisma.notification.create({
                data: {
                    teachersenderId: userId, // since here sender is a student (or using senderId)
                    receiverId: postAuthorId,
                    notificationType: 'comment',
                    date: new Date(),
                    postId: post.id,
                    notificationData: {
                        message: `Prof. ${currentUser.name} commented on your post: ${message}`,
                        title: post.title
                    },
                    read: false
                }
            });

            notificationPromises.push(commentNotification);
            socket.getIO().to(postAuthorId).emit('notification', commentNotification);
        }

        // If the post owner is a teacher:
        if (postTeacherId && commentTeacherId && (commentTeacherId === post.teacherId)) {
            const commentNotification = prisma.notification.create({
                data: {
                    teachersenderId: userId,
                    teacherreceiverId: postTeacherId,
                    notificationType: 'comment',
                    date: new Date(),
                    postId: post.id,
                    notificationData: {
                        message: `Prof. ${currentUser.name} commented on your post: ${message}`,
                        title: post.title
                    },
                    read: false
                }
            });

            notificationPromises.push(commentNotification);
            socket.getIO().to(postTeacherId).emit('notification', commentNotification);
        }
        await Promise.all(notificationPromises);

        res.status(201).send({ message: 'Reply created successfully and notifications sent.' });

    } catch (error) {
        console.error("Error creating reply:", error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

module.exports = router;