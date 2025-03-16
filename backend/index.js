// server.js or index.js (entry file)
const express = require('express');
const cors = require('cors');
const http = require('http');
const rootRouter = require('./routes/index');
const socket = require('./socket'); // Our custom socket module
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO and get the instance
const io = socket.init(server);

// Enable CORS for your client origin
app.use(cors({ origin: "https://futureforge-nine.vercel.app" }));

// Parse JSON payloads
app.use(express.json());

// Make the socket.io instance available in your routes (if needed)
app.use('/api/v1', (req, res, next) => {
    req.io = io;
    next();
});

// Use your root router for API endpoints
app.use('/api/v1', rootRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the HTTP server
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
