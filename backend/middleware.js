const jwt = require("jsonwebtoken");
require('dotenv').config
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (role) => {
    return (req, res, next) => {
        console.log("Middleware called");  // Basic log to confirm middleware execution
        const authHeader = req.headers?.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("Authorization header missing or malformed");
            return res.status(403).json({});
        }

        const token = authHeader.split(' ')[1];
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log("Decoded token:", decoded);  // Debugging log

            if (decoded.id && decoded.role === role) {
                req.userId = decoded.id;
                req.userRole = decoded.role;
                next();
            } else {
                console.log("Role mismatch or ID missing");
                return res.status(403).json({});
            }
        } catch (err) {
            console.log("Token verification failed", err);
            return res.status(403).json({});
        }
    };
};

module.exports = {
    authMiddleware
}