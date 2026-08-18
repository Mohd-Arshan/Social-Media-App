const jwt = require("jsonwebtoken");

const protectSocket = (socket, next) => {
    try {
        const token = socket.handshake.auth?.token || socket.handshake.query?.token;

        if (!token) {
            return next(new Error("Not authorized, no token"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    }
    catch (error) {
        console.error("Socket authentication error:", error);
        next(new Error("Not authorized, token failed"));
    }
}

module.exports = protectSocket;