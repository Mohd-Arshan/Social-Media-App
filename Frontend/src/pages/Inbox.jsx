/*  

  data formate :

   {
    "chatPartners": [
        {
            "_id": "6a7afb2e5b96386d8ad7125b",
            "username": "aj",
            "profile_picture": ""
        },
        {
            "_id": "6a7c377e70817b83f2783ed5",
            "username": "aj22222",
            "profile_picture": ""
        }
    ]
}

Step 1 : get the chat partners from the backend and store it in a state variable called chatPartners
step 2 : map through the chatPartners and display the username and profile picture in a list
step 3 : when the user clicks on a chat partner, navigate to the chat page with the chat partner's id as a parameter in the url

*/

import "../styles/Inbox.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";


export default function Inbox() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [chatPartners, setChatPartners] = useState([]);

    useEffect(() => {
        async function fetchChatPartners() {
            try {
                const data = await apiFetch(`/conversation/getChatPartners`);
                setChatPartners(data.chatPartners);
            } catch (error) {
                console.error("Error fetching chat partners:", error);
            }
        }

        fetchChatPartners();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="inbox-page">
            <h1>Inbox</h1>
            <ul className="chat-partners-list">
                {chatPartners.map((partner) => (
                    <li
                        key={partner._id}
                        className="chat-partner-item"
                        onClick={() => navigate(`/chat/${partner._id}`)}
                    >
                        <img
                            src={partner.profile_picture || "/default-profile.png"}
                            alt={`${partner.username}'s profile`}
                        />
                        <span>{partner.username}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}