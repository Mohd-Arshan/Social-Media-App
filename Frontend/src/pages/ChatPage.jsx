/*
step 1 : Get User ID from local storage
step 2 : Get Sender ID from Params
step 3 : Get Room ID from End-Point by Sender ID 
step 4 : Join Room with Room ID
step 5 : Get history of messages from End-Point by Room ID
step 6 : Display messages in chat window
step 7 : Send message to End-Point with Room ID
step 8 : Display sent message in chat window

NOTE : Revicer ID is not required as it is already present in the Room ID.
*/

import "../styles/ChatPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

import { apiFetch } from "../services/api";
import { useSocket } from "../context/SocketContext";

const ChatPage = () => {
    const { user } = useAuth();
    const { socket } = useSocket();
    const { senderId } = useParams();


    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [roomId, setRoomId] = useState(null);
    const [senderData, setSenderData] = useState({
        username: "",
        profilePicture: "",
    });

    useEffect(() => {
        try {
            if (!user || !senderId) {
                throw new Error("User or senderId is not defined");
            }
            // Step 3: Get Room ID from End-Point by Sender ID
            const fetchRoomId = async () => {
                try {
                    const data = await apiFetch(`/conversation/getRoomId/${senderId}`);
                    if (!data) {
                        throw new Error('No data received from the server');
                    }
                    setRoomId(data.roomId);
                }
                catch (error) {
                    console.error("Error fetching room ID:", error);
                }
            };
            fetchRoomId();
        }
        catch (error) {
            console.error("Error fetching room ID:", error);
        }
    }, [user, senderId]);


    useEffect(() => {
        if (!senderId) return;

        // Fetch sender data (username and profile picture) from the API
        const fetchSenderData = async () => {
            try {
                const data = await apiFetch(`/user/Profile/${senderId}`);
                if (!data) {
                    throw new Error('No data received from the server');
                }

                console.log("Fetched sender data:", data);
                setSenderData({
                    username: data.username,
                    profilePicture: data.profilePicture,
                });
            }
            catch (error) {
                console.error("Error fetching sender data:", error);
            }
        };
        fetchSenderData();
    }, [senderId]);



    useEffect(() => {
        if (!roomId) return;
        // Step 4: Join Room with Room ID
        socket.emit('Join-room', roomId);

        // Listen for incoming messages
        socket.on('receive-message', handleReceiveMessage);

        return () => {
            // Clean up the socket event listener when the component unmounts or roomId changes
            socket.emit('leave-room', roomId);
            socket.off('receive-message', handleReceiveMessage);
        }
    }, [roomId, socket]);

    useEffect(() => {
        if (!roomId) return;
        // Step 5: Get history of messages from End-Point by Room ID
        const fetchMessages = async () => {
            try {
                const data = await apiFetch(`/conversation/getMessages/${roomId}`);
                if (!data) {
                    throw new Error('No data received from the server');
                }
                setMessages(data.messages);
            }
            catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [roomId]);

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        if (!socket || !socket.connected) {
            console.error("Socket is not connected");
            return;
        }

        try {
            // Step 7: Send message to End-Point with Room ID
            socket.emit('send-message', {
                roomId,
                receiver: senderId,
                content: newMessage.trim(),
            }, (response) => {
                if (response.status === 'error') {
                    console.error("Error sending message:", response.message)
                }
                else {
                    console.log("Message sent successfully:", response.message);
                }
            });

            setNewMessage("");
        }
        catch (error) {
            console.error("Error sending message:", error);
        }
    }

    const handleReceiveMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }


    return (
        <div className="chat-page">
            <div className="chat-header">
                <img
                    src={senderData.profilePicture}
                    alt={`${senderData.username}'s profile`}
                    className="profile-picture"
                />

                <h2>{senderData.username}</h2>
            </div>

            <div className="chat-window">
                {messages.map((message) => (
                    <div
                        key={message._id}
                        className={`message ${String(message.sender) === String(user._id)
                                ? "sent"
                                : "received"
                            }`}
                    >
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>

            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
                    placeholder="Type a message..."
                />

                <button onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatPage;