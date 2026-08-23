const mongoose = require("mongoose");
const User = require("../models/user");
const Conversation = require("../models/conversation");
const Message = require("../models/message");


const getRoomId = async (req, res) => {
    const {id: userId2} = req.params; // Get the second user's ID from the request parameters
    const userId1 = req.user.id; // Assuming you have the authenticated user's ID in req.user

    try {
        
        const user1 = await User.findById(userId1);
        if (!user1) {
            return res.status(404).json({ message: "User1 not found" });
        }

        const user2 = await User.findById(userId2);
        if (!user2) {
            return res.status(404).json({ message: "User2 not found" });
        }

        // Check if a conversation already exists between the two users
        let conversation = await Conversation.findOne({
            participants: { $all: [userId1, userId2] }
        });

        if (!conversation) {
            // If no conversation exists, create a new one
            conversation = new Conversation({   
            participants: [userId1, userId2]
            });
            await conversation.save();
        }
        
        res.status(200).json({ roomId: conversation._id });
    }
    catch (error) {
        console.error("Error getting room ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getMessages = async (req, res) => {
    const { roomId } = req.params;
    
    try {
        // Validate roomId
        if (!mongoose.Types.ObjectId.isValid(roomId)) {
            return res.status(400).json({ message: "Invalid room ID" });
        }

        // Check if the conversation exists
        const conversation = await Conversation.findById(roomId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        // Fetch messages for the conversation
        const messages = await Message.find({ roomId }).sort({ createdAt: 1 }); // Sort messages by creation time in ascending order

        res.status(200).json({ messages });
    }
    catch (error) {
        console.error("Error getting messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

// Function to get chat partners for the authenticated user
// This function retrieves the list of users that the authenticated user has conversations with
const getChatPartners = async (req, res) => {
    const userId = req.user.id; // Assuming you have the authenticated user's ID in req.user

    try {
        // Find conversations where the user is a participant
        const conversations = await Conversation.find({ participants: userId });

        // Extract the other participant's IDs from the conversations
        const chatPartners = conversations.map(conversation => {
            const otherParticipantId = conversation.participants.find(participantId => participantId.toString() !== userId);
            return otherParticipantId;
        });

        // Fetch user details for the chat partners
        const chatPartnerDetails = await User.find({ _id: { $in: chatPartners } }).select('username profile_picture');

        res.status(200).json({ chatPartners: chatPartnerDetails });
    }
    catch (error) {
        console.error("Error getting chat partners:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { getRoomId, getMessages, getChatPartners };