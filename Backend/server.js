const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

// Import database connection and socket initialization
const connectDB = require('./configs/db');
const initializeChatSocket = require('./sockets/chatSocket');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const followRoutes = require('./routes/followRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

dotenv.config();

const App = express();

// Create HTTP server and integrate Socket.IO
const server = http.createServer(App);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


// Middleware
App.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
);
App.use(express.json());
App.use(cookieParser());

// Connect to the database
connectDB();

// Initialize chat socket
initializeChatSocket(io);


// Routes
App.use('/api/auth', authRoutes);
App.use('/api/user', userRoutes);
App.use('/api/follow', followRoutes);
App.use('/api/post', postRoutes);
App.use('/api/like', likeRoutes);
App.use('/api/conversation', conversationRoutes);


const PORT = process.env.PORT || 5000;



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});