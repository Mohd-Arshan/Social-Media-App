import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function RightSidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="right-sidebar">
            <Link to={`/profile/${user._id}`} className="profile-link">
                <div className="user-info">
                    <img src={user.profile_picture} alt={`${user.username}'s avatar`} />
                </div>
            </Link>
            <div>
                <h2>
                    //inbox 
                </h2>
            </div>
            <div>
                <h2>
                    //create post 
                </h2>
            </div>
        </div>
    )
}