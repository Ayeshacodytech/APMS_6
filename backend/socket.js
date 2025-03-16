// socket.js
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

const init = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'https://futureforge-nine.vercel.app', // Allow client domain
            methods: ['GET', 'POST']
        }
    });

    // Middleware for authenticating socket connections
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                console.log("Decoded user:", user);

                // Ensure user and role are present
                if (!user || !user.role) {
                    return next(new Error("Not authorized: Invalid user or missing role"));
                }

                // Check for valid roles
                const validRoles = ["student", "teacher"];
                if (validRoles.includes(user.role)) {
                    // Attach user information to the socket
                    socket.user = { id: user.id, role: user.role };
                    return next();
                } else {
                    return next(new Error("Not authorized: Role not recognized"));
                }
            } catch (err) {
                console.error("Token verification failed:", err);
                return next(new Error("Not authorized: Invalid or expired token"));
            }
        } else {
            return next(new Error("Not authorized: Token missing"));
        }
    });

    // Handle socket connections
    io.on('connection', (socket) => {
        console.log(`Connected: ${socket.id}, Role: ${socket.user.role}`);

        // You can implement role-specific logic here:
        if (socket.user.role === 'student') {
            console.log('A student connected.');
        } else if (socket.user.role === 'teacher') {
            console.log('A teacher connected.');
        }

        // Optionally, join the user to a room based on their id
        socket.join(socket.user.id);
        console.log(`User ${socket.user.id} joined room ${socket.user.id}`);

        // Log disconnections
        socket.on('disconnect', () => {
            console.log(`Disconnected: ${socket.id}, Role: ${socket.user.role}`);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');
    }
    return io;
};

module.exports = {
    init,
    getIO
};
