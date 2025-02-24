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
});

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
    if (
      req.file.mimetype === "image/png" ||
      req.file.mimetype === "image/jpeg"
    ) {
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
    res
      .status(500)
      .json({ message: "Failed to upload image", error: error.message });
  }
});
// Image Upload Route
// router.post("/upload-image", upload.single("image"), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No image uploaded" });
//         }

//         // Upload image to Cloudinary
//         const result = await new Promise((resolve, reject) => {
//             cloudinary.uploader.upload_stream(
//                 { folder: "blog_images" },
//                 (error, result) => {
//                     if (error) reject(error);
//                     else resolve(result);
//                 }
//             ).end(req.file.buffer);
//         });

//         return res.status(200).json({ imageUrl: result.secure_url });

//     } catch (error) {
//         console.error("Image upload failed:", error);
//         res.status(500).json({ message: "Failed to upload image", error: error.message });
//     }
// });
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
        const {userId} = req;

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
                        likes: {
                            include: {
                                user: { select: { id: true, name: true } }
                            }
                        },
                        replies: {
                            include: {
                                author: { select: { id: true, name: true } },
                                likes: {
                                    include: {
                                        user: { select: { id: true, name: true } }
                                    }
                                }
                            }
                        }
                    }
                },
                likes: {
                    include: {
                        user: { select: { id: true, name: true } }
                    }
                },
                PostLike: {  // If likes are stored in this model
                    include: {
                        user: { select: { id: true, name: true } }
                    }
                }
            }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Extracting users who liked the post
        const likedUsers = post.likes.map(like => like.user);
        const likedUsersFromPostLike = post.PostLike ? post.PostLike.map(like => like.user) : [];

        // Combine both in case likes are stored in different places
        const allLikedUsers = [...likedUsers, ...likedUsersFromPostLike];

        // Check if the current user has liked the post
        const hasLiked = allLikedUsers.some(user => user.id === userId);

        res.status(200).json({
            ...post,
            likedUsers: allLikedUsers,  // Ensure liked users appear in the response
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
                console.log(socket.getIO().to(mentionedUser.id).emit('notification', notification))
                console.log("notification sent")
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
            console.log('Emitting notification to user:', mentionedUsers.id, commentNotification);
            //socket.getIO().to(mentionedUsers.id).emit('notification', notification);

            socket.getIO().to(post.userId).emit('notification', commentNotification);
            console.log("success")
        }
        await Promise.all(notificationPromises);

        res.status(201).send({ ...comment, author: { userId }, commentVotes: [] });

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
            select: { id: true, name: true }, // Include avatar if needed
        });
        const post = await prisma.community.findUnique({
            where: {
                id: postId
            },
            select: {
                id: true, authorId: true
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
                    userId,
                },
            });

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
            })
            console.log('Initiating emit');
            socket.getIO().to(post.authorId).emit('notification', notification)
            console.log('Emit successfull')
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

        const replyToReply = await prisma.commentReply.findUnique({
            where: { id: commentId },
            select: {
                id: true,
                parentCommentId: true,
                author: { select: { id: true, name: true } }
            }
        });

        let comment, parentCommentId;

        if (replyToReply) {
            comment = await prisma.comments.findUnique({
                where: { id: replyToReply.parentCommentId },
                select: { postId: true }
            });

            parentCommentId = replyToReply.parentCommentId;
        }
        else {
            comment = await prisma.comments.findUnique({
                where: { id: commentId },
                select: {
                    id: true,
                    postId: true,
                    author: { select: { id: true, name: true } }
                }
            });

            if (!comment) {
                return res.status(404).send({ error: 'Comment not found' });
            }

            parentCommentId = commentId;
        }

        const [post, currentUser] = await Promise.all([
            prisma.community.findUnique({
                where: { id: comment.postId },
                select: { id: true, authorId: true, title: true }
            }),
            prisma.student.findUnique({
                where: { id: userId },
                select: { id: true, name: true }
            })
        ]);

        const commentAuthor = replyToReply ? replyToReply.author.username : comment.author.username;
        const replyContent = `@${commentAuthor} ${message}`;


        await prisma.commentReply.create({
            data: {
                message: replyContent,
                authorId: userId,
                parentCommentId
            }
        });

        const notificationPromises = [];

        const originalAuthorId = replyToReply ? replyToReply.author.id : comment.author.id;

        if (originalAuthorId !== userId) {
            const notification = prisma.notification.create({
                data: {
                    senderId: userId,
                    receiverId: originalAuthorId,
                    notificationType: 'reply',
                    date: new Date(),
                    postId: post.id,
                    notificationData: {
                        message: `${currentUser.username} replied: ${replyContent}`,
                        title: post.title
                    },
                    read: false
                }
            });

            notificationPromises.push(notification);
            socket.getIO().to(originalAuthorId).emit('notification', notification);
        }

        if (post.userId !== originalAuthorId && post.userId !== userId) {
            const notification = prisma.notification.create({
                data: {
                    senderId: userId,
                    receiverId: post.authorId,
                    notificationType: 'comment',
                    date: new Date(),
                    postId: post.id,
                    notificationData: {
                        message: `${currentUser.name} commented on your post: ${message}`,
                        title: post.title
                    },
                    read: false
                }
            });

            notificationPromises.push(notification);
            socket.getIO().to(post.userId).emit('notification', notification);
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