const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const connectDB = require('./configs/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const followRoutes = require('./routes/followRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();

const App = express();


// Middleware
App.use(express.json());
App.use(cookieParser());

connectDB();

// Routes
App.use('/api/auth', authRoutes);
App.use('/api/user', userRoutes);
App.use('/api/follow', followRoutes);
App.use('/api/post', postRoutes);


const PORT = process.env.PORT || 5000;


App.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});