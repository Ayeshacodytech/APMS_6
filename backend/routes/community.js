//community.js

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
router.post("/newpost", authMiddleware('student'), async (req, res) => {
    try {
        const authorId = req.userId;
        console.log(authorId);
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
                authorId,
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
router.get("/myposts", authMiddleware('student'), async (req, res) => {
    try {
        // Get the user ID from the authenticated user
        const { userId } = req;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch posts by the logged-in user
        const posts = await prisma.community.findMany({
            where: {
                authorId: userId, // Filter posts by the logged-in user
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
                authorId: userId, // Count posts by the logged-in user
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
router.get('/posts/:postId', authMiddleware('student'), async (req, res) => {
    const { postId } = req.params;
    const userId = req.userId; // Get the current logged-in user

    try {
        const post = await prisma.community.findUnique({
            where: { id: postId },
            include: {
                author: {
                    select: { id: true, name: true, email: true }
                },
                comments: {
                    include: {
                        author: { select: { id: true, name: true, email: true } },
                        teacher: { select: { id: true, name: true, email: true } },
                        likes: {
                            include: {
                                user: { select: { id: true, name: true } }
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


router.get('/posts/:postId/likes', authMiddleware('student'), async (req, res) => {
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
                        }
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Extract users who liked the post
        const likedUsers = post.likes.map(like => like.user);

        // Check if the current user has liked the post
        const userHasLiked = post.likes.some(like => like.user.id === userId);

        res.status(200).json({ likedUsers, userHasLiked });
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
router.delete('/post/:postId', authMiddleware('student'), async (req, res) => {
    const { postId } = req.params;
    const { userId } = req;

    try {
        const post = await prisma.community.findUnique({
            where: {
                id: postId,
            },
            include: {
                author: true,
            },
        });

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.authorId !== userId) {
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
router.post('/:postId/comments', authMiddleware('student'), async (req, res) => {
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
        const user = await prisma.student.findUnique({
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
                authorId: userId,
                postId: postId,
            },
        });

        // Prepare an array for notifications.
        const notificationPromises = [];
        const io=socket.getIO();
        // Notify the post owner if a teacher is associated.
        if (post.teacher && post.teacher.id) {
            const teacherNotification = prisma.notification.create({
                data: {
                    senderId: userId,
                    teacherreceiverId: post.teacher.id,
                    notificationType: 'comment',
                    date: new Date(),
                    postId: postId,
                    notificationData: {
                        message: `${user.name} commented on your post.`,
                        title: post.title // or you might use post.title if that field is available 
                    },
                    read: false,
                }
            }).then((notification) => {
                io.to(post.teacher.id).emit('notification', notification);
                console.log("Notification emitted to:", post.teacher.id, teacherNotification);
                return notification;
            })
            notificationPromises.push(teacherNotification);
        } 

        // Notify the author of the post if available.
        if (post.author && post.author.id!==userId) {
            const authorNotification = prisma.notification.create({
                data: {
                    senderId: userId,  // since sender is a teacher
                    receiverId: post.author.id,
                    notificationType: 'comment',
                    date: new Date(),
                    postId: postId,
                    notificationData: {
                        message: `${user.name} commented on your post.`,
                        title: post.title   // adjust as needed with post.title or similar field
                    },
                    read: false,
                }
            }).then((notification) => {
                io.to(post.author.id).emit('notification', notification);
                console.log("Notification emitted to:", post.author.id, authorNotification);
                return notification;
            })
            notificationPromises.push(authorNotification);
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

// Update a comment
router.put('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const { userId } = req;

        const updatedComment = await prisma.comment.updateMany({
            where: {
                id: commentId,
                authorId: userId,
            },
            data: { content },
        });

        if (updatedComment.count === 0) {
            return res.status(404).json({ error: "Comment not found or not authorized" });
        }

        res.status(200).json({ message: "Comment updated successfully", updatedComment });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req;
        const collectReplies = async (commentId) => {
            const replies = await prisma.commentReply.findMany({
                where: {
                    parentCommentId: commentId
                },
                select: {
                    id: true
                }
            });
            for (const reply of replies) {
                const nestedReplies = await collectReplies(reply.id);
                replies.push(...nestedReplies);
            }
            return replies;
        };

        const allReplies = await collectReplies(commentId);

        const replyIds = allReplies.map(reply => reply.id);

        if (replyIds.length > 0) {
            await prisma.commentReply.deleteMany({
                where: {
                    id: { in: replyIds }
                }
            });
        }

        const deletedComment = await prisma.comment.deleteMany({
            where: {
                id: commentId,
                authorId: userId
            }
        });

        if (deletedComment.count === 0) {
            return res.status(404).json({ error: "Comment not found or not authorized" });
        }

        res.status(200).json({ message: "Comment and all related replies deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment and its replies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// Like a  comment
router.post('/likes/comment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { userId } = req;
        const [comment, currentUser] = await Promise.all([
            prisma.comment.findUnique({
                where: {
                    id: commentId
                },
                select: {
                    id: true,
                    message: true,
                    author: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    post: {
                        select: {
                            id: true,
                            image: true
                        }
                    }
                }
            }),
            prisma.student.findUnique({
                where: { id: userId },
                select: { id: true, name: true }
            })
        ]);
        const like = await prisma.commentLike.findFirst({
            where: {
                commentId: commentId,
                userId: userId,
            },
            select: {
                id: true,
            },
        });

        if (like) {
            await prisma.commentLike.delete({
                where: {
                    id: like.id,
                },
            });
            return res.send({ success: true, message: 'Comment unliked' });
        } else {
            await prisma.commentLike.create({
                data: {
                    commentId: commentId,
                    userId: userId,
                },
            });
            const notification = await prisma.notification.create({
                data: {
                    notificationType: 'like',
                    senderId: userId,
                    receiverId: comment.author.id,
                    date: new Date(),
                    notificationData: { message: `${currentUser.username} liked your comment: ${comment.message}`, avatar: currentUser.avatar, image: comment.post.image },
                    read: false
                }
            })
            const io = req.io;
            console.log("Attempting to emit like notification...");
            io.to(comment.authorId).emit('notification', notification);
            console.log(notification);
            console.log("Like notification emitted.")
            return res.send({ success: true, message: 'Comment liked' });
        }
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
// Like a post
router.post('/likes/post/:postId', authMiddleware('student'), async (req, res) => {
    try {
            const { postId } = req.params;
            const { userId } = req;
            const currentUser = await prisma.student.findUnique({
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
                    userId: userId,
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
                        userId: userId,
                    },
                });
                const notificationPromises = [];
                if (post.teacherId) {
                    console.log('teacher')
                    const notification = await prisma.notification.create({
                        data: {
                            senderId: userId,
                            teacherreceiverId: post.teacherId,
                            notificationType: 'like',
                            date: new Date(),
                            postId: postId,
                            notificationData: {
                                message: `${currentUser.name} liked your post`,
                                title: post.title
                            },
                            read: false,
                        }
                    }).then((notification)=>{
                        socket.getIO().to(post.teacherId).emit('notification', notification)
                        console.log("Notification emitted to:", post.teacherId, notification);
                        return notification;
                    })
                    notificationPromises.push(notification);
                }
                if (post.authorId&&(post.authorId!==userId)) {
                    const notification = await prisma.notification.create({
                        data: {
                            senderId: userId,
                            receiverId: post.authorId,
                            notificationType: 'like',
                            date: new Date(),
                            postId: postId,
                            notificationData: {
                                message: `${currentUser.name} liked your post`,
                                title: post.title
                            },
                            read: false,
                        }
                    }).then((notification)=>{
                        socket.getIO().to(post.authorId).emit('notification', notification)
                        console.log("Notification emitted to:", post.authorId, notification);
                        return notification;
                    })
                    notificationPromises.push(notification);
                }
                await Promise.all(notificationPromises);
                return res.send({ success: true, message: 'Comment liked' });
            }
        } catch (error) {
            console.error('Error fetching likes:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
});

// Like a reply
router.post('/likes/reply/:replyId', async (req, res) => {
    try {
        const { replyId } = req.params;
        const { userId } = req;
        const [reply, currentUser] = await Promise.all([
            prisma.commentReply.findUnique({
                where: {
                    id: replyId,
                },
                select: {
                    id: true,
                    message: true,
                    parentCommentId: true,
                    author: { select: { id: true, name: true } },
                    parentComment: {
                        select: {
                            id: true,
                            message: true,
                            author: { select: { id: true, name: true } },
                            post: {
                                select: {
                                    id: true,
                                    image: true,
                                    userId: true, // Post owner's ID
                                },
                            },
                        },
                    },
                },
            }),
            prisma.student.findUnique({
                where: { id: userId },
                select: { id: true, username: true, avatar: true }
            })
        ])
        const like = await prisma.commentReplyLike.findFirst({
            where: {
                commentReplyId: replyId,
                userId: userId
            },
            select: {
                id: true
            }
        });
        if (like) {
            await prisma.commentReplyLike.delete({
                where: {
                    id: like.id
                }
            });
            return res.send({ success: true, message: 'Reply unliked' });
        } else {
            await prisma.commentReplyLike.create({
                data: {
                    commentReplyId: replyId,
                    userId: userId
                }
            });
            const notification = await prisma.notification.create({
                data: {
                    notificationType: 'like',
                    senderId: currentUser.id,
                    receiverId: reply.authorId,
                    date: new Date(),
                    notificationData: { message: `${currentUser.name} liked your comment`, title: reply.parentComment.post.title },
                    read: false
                }
            })
            console.log('Initiating emit');
            socket.getIO().to(reply.author.id).emit('notification', notification)
            console.log('Emit successfull')
            return res.send({ success: true, message: 'Reply liked' });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})


// Get likes for a comment
router.get('/likes/comment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;

        const likes = await prisma.like.findMany({
            where: { commentId },
            include: {
                user: { select: { name: true } },
            },
        });

        res.status(200).json({ likes });
    } catch (error) {
        console.error("Error fetching likes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.post('/reply/:commentId', authMiddleware('student'), async (req, res) => {
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
                prisma.student.findUnique({
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
                    authorId: userId,
                    parentCommentId: commentId
                }
            });
    
            const notificationPromises = [];
            const postAuthorId = post.authorId
            const postTeacherId = post.teacherId
    
            if (commentAuthorId && commentAuthorId !== postAuthorId) {
                const notification = prisma.notification.create({
                    data: {
                        senderId: userId,
                        receiverId: commentAuthorId,
                        notificationType: 'reply',
                        date: new Date(),
                        postId: post.id,
                        notificationData: {
                            message: `${currentUser.name} replied: ${replyContent}`,
                            title: post.title
                        },
                        read: false
                    }
                }).then((notification) => {
                    socket.getIO().to(commentAuthorId).emit('notification', notification);
                    console.log("Notification emitted to:", commentAuthorId, notification);
                    return notification;
                })
                notificationPromises.push(notification);
            }
            if (commentTeacherId && commentTeacherId !== postTeacherId) {
                const notification = prisma.notification.create({
                    data: {
                        senderId: userId,
                        teacherreceiverId: commentTeacherId,
                        notificationType: 'reply',
                        date: new Date(),
                        postId: post.id,
                        notificationData: {
                            message: `${currentUser.name} replied: ${replyContent}`,
                            title: post.title
                        },
                        read: false
                    }
                }).then((notification) => {
                    socket.getIO().to(commentTeacherId).emit('notification', notification);
                    console.log("Notification emitted to:", commentTeacherId, notification);
                    return notification;
                })
    
                notificationPromises.push(notification);
            }
            if (postAuthorId && commentAuthorId && (commentAuthorId === postAuthorId)) {
                const commentNotification = prisma.notification.create({
                    data: {
                        senderId: userId, // since here sender is a student (or using senderId)
                        receiverId: postAuthorId,
                        notificationType: 'comment',
                        date: new Date(),
                        postId: post.id,
                        notificationData: {
                            message: `3 ${currentUser.name} commented on your post: ${message}`,
                            title: post.title
                        },
                        read: false
                    }
                }).then((notification) => {
                    socket.getIO().to(postAuthorId).emit('notification', notification);
                    console.log("Notification emitted to:", postAuthorId, notification);
                    return notification;
                })
                notificationPromises.push(commentNotification);
            }
    
            // If the post owner is a teacher:
            if (postTeacherId && commentTeacherId && (commentTeacherId === post.teacherId)) {
                const commentNotification = prisma.notification.create({
                    data: {
                        senderId: userId,
                        teacherreceiverId: postTeacherId,
                        notificationType: 'comment',
                        date: new Date(),
                        postId: post.id,
                        notificationData: {
                            message: `4 ${currentUser.name} commented on your post: ${message}`,
                            title: post.title
                        },
                        read: false
                    }
                }).then((notification) => {
                    socket.getIO().to(postTeacherId).emit('notification', notification);
                    console.log("Notification emitted to:", postTeacherId, notification);
                    return notification;
                })
                notificationPromises.push(commentNotification);
            }
            await Promise.all(notificationPromises);
    
            res.status(201).send({ message: 'Reply created successfully and notifications sent.' });
    
        } catch (error) {
            console.error("Error creating reply:", error);
            res.status(500).send({ error: 'Internal server error' });
        }
});
router.delete('/replies/:replyId', async (req, res) => {
    try {
        const { replyId } = req.params;
        const { userId } = req;

        const collectNestedReplies = async (replyId) => {
            const nestedReplies = await prisma.commentReply.findMany({
                where: {
                    parentCommentId: replyId
                },
                select: {
                    id: true
                }
            });

            for (const reply of nestedReplies) {
                const repliesOfReply = await collectNestedReplies(reply.id);
                nestedReplies.push(...repliesOfReply);
            }

            return nestedReplies;
        };

        const allNestedReplies = await collectNestedReplies(replyId);

        const nestedReplyIds = allNestedReplies.map(reply => reply.id);

        if (nestedReplyIds.length > 0) {
            await prisma.commentReply.deleteMany({
                where: {
                    id: { in: nestedReplyIds }
                }
            });
        }

        const deletedReply = await prisma.commentReply.deleteMany({
            where: {
                id: replyId,
                authorId: userId
            }
        });

        if (deletedReply.count === 0) {
            return res.status(404).json({ error: "Reply not found or not authorized" });
        }

        res.status(200).json({ message: "Reply and all nested replies deleted successfully" });
    } catch (error) {
        console.error("Error deleting reply and its nested replies:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
