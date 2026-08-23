import "../styles/RightSidebar.css";
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CreatePost from './createPost';
import { MessageCircle, Plus, LogOut } from 'lucide-react';



export default function RightSidebar() {
    const { user, logout } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <div className="right-sidebar">

            {/* Profile */}
            <Link
                to={`/profile/${user._id}`}
                className="sidebar-profile"
            >
                <img
                    src={user.profile_picture}
                    alt={`${user.username}'s avatar`}
                    className="sidebar-profile-avatar"
                />

                <div className="sidebar-profile-info">
                    <span className="sidebar-profile-name">
                        {user.username}
                    </span>

                    <span className="sidebar-profile-label">
                        View profile
                    </span>
                </div>
            </Link>


            {/* Inbox */}
            <button
                className="sidebar-action"
                onClick={() => navigate("/inbox")}
            >
                <span className="sidebar-action-icon">
                    <MessageCircle size={21} strokeWidth={2} />
                </span>

                <span className="sidebar-action-text">
                    Inbox
                </span>
            </button>


            {/* Create Post */}
            <button
                className="sidebar-action create-post-action"
                onClick={() => setIsModalOpen(true)}
            >
                <span className="sidebar-action-icon">
                    <Plus size={22} strokeWidth={2.5} />
                </span>

                <span className="sidebar-action-text">
                    Create Post
                </span>
            </button>


            {isModalOpen && (
                <CreatePost
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            {/* Logout */}
            <button
                className="sidebar-action logout-action"
                onClick={handleLogout}
            >
                <span className="sidebar-action-icon">
                    <LogOut size={22} strokeWidth={2.5} />
                </span>

                <span className="sidebar-action-text">
                    Logout
                </span>
            </button>

        </div>
    );
}