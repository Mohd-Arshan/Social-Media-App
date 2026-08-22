const Message = require('../models/message');
const protectSocket = require('../middleware/authSocketMiddleware');
const Conversation = require('../models/conversation');

const initializeChatSocket = (io) => {

    // Use the protectSocket middleware to authenticate users before allowing them to connect
    io.use(protectSocket);

    // Handle socket connections
    io.on('connection', (socket) => {

        // Log the connected user's ID (if available)
        console.log('A user connected:', socket.user.id || socket.user._id);

        // Handle joining a chat room
        socket.on('Join-room', async(roomId) => {

            try{
                const conversation = await Conversation.findOne({
                    _id: roomId,
                    participants: { $in: [socket.user.id || socket.user._id] }
                });

                if (!conversation) {
                    console.error(`User ${socket.user.id || socket.user._id} is not a participant of room ${roomId}`);
                    socket.emit('error', { message: 'You are not authorized to join this room' });
                    return;
                }

                socket.join(roomId);
                console.log(`User ${socket.user.id || socket.user._id} joined room ${roomId}`);
            }

            catch (err) {
                console.error('Error joining room:', err);
                socket.emit('error', { message: 'Failed to join room', error: err.message });
            }
        });

        // Handle sending messages
        socket.on('send-message', async (data , callback) => {

            try {
                const conversation = await Conversation.findOne({
                    _id: data.roomId,
                    participants: { $in: [socket.user.id || socket.user._id] }
                });

                if (!conversation) {
                    console.error(`User ${socket.user.id || socket.user._id} is not a participant of room ${data.roomId}`);
                    callback({ status: 'error', message: 'You are not authorized to send messages in this room' });
                    return;
                }
                const { receiver, content, roomId } = data;

                const sender = socket.user.id || socket.user._id;

                if (!receiver || !content || !roomId || content.trim() === '') {
                    console.error('Missing required fields in message data:', data);
                    return;
                }

                const newMessage = await Message.create({
                    roomId,
                    sender,
                    receiver,
                    content: content.trim()
                });

                io.to(roomId).emit('receive-message', {
                    _id: newMessage._id,
                    roomId: newMessage.roomId,
                    sender: newMessage.sender,
                    receiver: newMessage.receiver,
                    content: newMessage.content,
                    timestamp: newMessage.timestamp,
                });

                callback({ status: 'success', message: 'Message sent successfully' });
            }
            catch (err) {
                callback({ status: 'error', message: 'Failed to send message', error: err.message });
            }

        });

        // Handle leaving a chat room
        socket.on('leave-room', (roomId) => {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room ${roomId}`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
}

module.exports = initializeChatSocket;