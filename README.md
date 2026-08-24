# Social Media Application

A full-stack social media application built using the MERN stack,
featuring JWT-based authentication, social interactions, and
secure real-time messaging using Socket.IO.

---

## Features

- User authentication
- User profiles
- Create, update, and delete posts
- Like and unlike posts
- Follow and unfollow users
- Conversations
- Real-time messaging
- Secure Socket.IO communication
- Conversation-level authorization

---

## Tech Stack

### Frontend

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="45" height="45" alt="React"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg" width="45" height="45" alt="React Router"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" width="45" height="45" alt="Vite"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" width="45" height="45" alt="Socket.IO"/>
</p>

**React** · **React Router** · **Vite** · **Socket.IO Client**

### Backend

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="45" height="45" alt="Node.js"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="45" height="45" alt="Express.js"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="45" height="45" alt="MongoDB"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" width="45" height="45" alt="Mongoose"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" width="45" height="45" alt="Socket.IO"/>
</p>

**Node.js** · **Express.js** · **MongoDB** · **Mongoose** · **Socket.IO**

### Authentication & Security

<p align="left">
  <img src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/4/jwt-icon-138bxvrhijus263d2f2wur.png/jwt-icon-aqjx58uyj3lrxtborzgyg.png?_a=DATAiZAAZAA0" width="45" height="45" alt="JWT"/>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcUC8EFaiHqkLhG8DW5OPtgOg8KD9O2YZl5aYitJ8h5ClHKL-F4sBi2vh&s=10" width="45" height="45" alt="bcrypt"/>
  <img src="https://e7.pngegg.com/pngimages/170/188/png-clipart-web-page-http-cookie-biscuits-world-wide-web-computer-file-world-wide-web-brown-food.png" width="45" height="45" alt="Cookies"/>
</p>

**JWT** · **bcrypt** · **Cookies** · **CORS**
---

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React · React Router · Vite · Socket.IO Client |
| Backend | Node.js · Express.js · Socket.IO |
| Database | MongoDB · Mongoose |
| Authentication | JWT · Cookies · bcrypt |
| Development | Git · npm |


## Screenshots

<!-- Add your application screenshots here -->

![Login](docs/images/login.png)

![Home](docs/images/home.png)

![Chat](docs/images/chat.png)

---

## Architecture

High-level overview of the application architecture.

[View Architecture Documentation](docs/architecture/README.md)

---

## Database Design

The application uses MongoDB with Mongoose for data modeling.

[View Database Documentation](docs/database/README.md)

---

## API Documentation

Detailed documentation of the REST API endpoints.

[View API Documentation](docs/api/README.md)

---

## Authentication & Authorization

Documentation of JWT authentication, cookies, protected routes,
and conversation-level authorization.

[View Authentication Documentation](docs/authentication/README.md)

---

## Real-Time Communication

Documentation of Socket.IO authentication, room management,
message flow, and real-time communication.

[View Real-Time Communication Documentation](docs/realtime/README.md)


## Installation & Setup

### Prerequisites

- Node.js
- npm
- MongoDB
- Git

### Clone Repository

```bash
git clone https://github.com/Mohd-Arshan/Social-Media-App
cd Social Media App 
```

### Backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```
```bash
npm install express
npm install mongoose
npm install socket.io
npm install jsonwebtoken
npm install bcrypt
npm install cookie-parser
npm install cors
npm install dotenv
npm install multer
```
```bash
npm run server
```
### Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```
```bash
npm install react react-dom
npm install react-router-dom
npm install socket.io-client
npm install lucide-react
```
```bash
npm run dev
```

### Environment Variables

Create a .env file inside the backend directory:

```bash
MONGODB_USERNAME=""
MONGODB_PASSWORD=""
MONGODB_URL=""
JWT_SECRET=""
```

### Run the Application

The frontend and backend should run simultaneously:

#### Backend:

```bash
cd backend
npm run server
```
#### Frontend:

```bash
cd frontend
npm run dev
```

## Limitations

The current version of the application has the following limitations:

- No advanced post recommendation system
- No user recommendation system
- No online/offline status
- No notification system
- No typing indicator
- No end-to-end encryption for messages
- No direct image uploading
- Images are currently handled using image URLs
- No cloud-based image storage such as AWS S3
- Future Enhancements

## The following features can be added in future versions:

- Personalized post and user recommendation system
- Online/offline user indicators
- Real-time notification system
- Typing indicators for chat
- End-to-end encrypted messaging
- Direct image uploading
- AWS S3 integration for scalable image storage
- Improved media management and storage

## Author

Mohd Arshan

B.Tech — Computer Science and Engineering

GitHub: @Mohd-Arshan
