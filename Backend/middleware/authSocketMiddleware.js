const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const protectSocket = (socket, next) => {
    try {
        const rawCookies = socket.handshake.headers.cookie;
        const parsedCookies = cookie.parse(rawCookies || "");

        
        const token = socket.handshake.auth?.token || 
                      socket.handshake.query?.token || 
                      parsedCookies.token; 

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