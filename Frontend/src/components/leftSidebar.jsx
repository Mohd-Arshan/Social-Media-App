import {useAuth} from "../context/AuthContext";
import {useNavigate, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import useFollowUser from "../context/follow";


function ProfileCard({profile}){
    const { followed, loading, error, toggleFollow } = useFollowUser();

    const handleFollowClick = async () => {
        await toggleFollow({ userToFollowId: profile._id });
    };

    return (
        <li key={profile.id} className="profile-item">
            <Link to={`/profile/${profile._id}`} className="profile-link">
                <img src={profile.profile_picture} alt={`${profile.username}'s avatar`} className="profile-avatar" />
                <span className="profile-username">{profile.username}</span>
            </Link> 
            <div className="follow-button-container">
                <button
                    className={`follow-button ${followed ? 'unfollow' : 'follow'}`}
                    onClick={handleFollowClick}
                >
                    {loading ? 'Processing...' : (followed ? 'Unfollow' : 'Follow')}    
                </button>
                {error && <p className="error-message">{error}</p>}
            </div>
        </li>
    );
}

export default function LeftSidebar() {
    const navigate = useNavigate();
    const [recommendProfiles, setRecommendProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

    const followObj = useFollowUser();
    console.log("Follow object state:", followObj); // debugging log

    const handleButtonClick = async (userToFollowId) => {
        await followObj.toggleFollow({ userToFollowId });
    };
    

    useEffect(() => {
        async function fetchRecommendProfiles() {
            try {
                const data = await apiFetch("/user/recommend-profiles");
                if (!data) {
                    throw new Error('No data received from the server');
                }
                setRecommendProfiles(data);
                console.log("Recommended profiles:", data); // debugging log
            }
            catch (error) {
                console.error("Error fetching recommended profiles:", error);
            }
            finally {
                setLoading(false);
            }
        }
        fetchRecommendProfiles();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <div className="left-sidebar">
            <div className="recommend-profiles">
                {loading ? (
                    <p>Loading recommended profiles...</p>
                ) : (
                    <ul className="profile-list">
                        {recommendProfiles.map(profile => (
                            <ProfileCard key={profile._id} profile={profile} />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

}