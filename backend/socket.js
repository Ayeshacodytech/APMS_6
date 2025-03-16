const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

let io;

const init = (server) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        }
    });

    io.use((socket, next) => {
        const token = socket.handshake.auth.token; // Ensure auth is used here
        if (token) {
            try {
                const user = jwt.verify(token, process.env.JWT_SECRET);
                console.log("Decoded user:", user);

                if (!user || !user.role) {
                    return next(new Error("Not authorized: Invalid user or missing role"));
                }

                const validRoles = ["student", "teacher"];
                if (validRoles.includes(user.role)) {
                    socket.user = { id: user.id, role: user.role }; // Attach user to socket
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




    io.on('connection', (socket) => {
        console.log(`Connected: ${socket.id}, Role: ${socket.user.role}`);

        if (socket.user.role === 'student') {
            console.log('A student connected.');
            // Handle student-specific logic
        } else if (socket.user.role === 'teacher') {
            console.log('A teacher connected.');
            // Handle teacher-specific logic
        }
        socket.join(socket.user.id);
        console.log(`User ${socket.user.id} joined room ${socket.user.id}`);
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
