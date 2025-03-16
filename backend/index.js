const express= require('express');
const cors= require('cors');
const rootRouter= require('./routes/index');
const socket=require('./socket');
const app=express();
const http = require('http');
const server = http.createServer(app);
const io = socket.init(server);
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/api/v1',rootRouter);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/api/v1', (req, res, next) => {
    req.io = io;
    next();
}, rootRouter);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
