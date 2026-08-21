import {useAuth} from "../context/authContext";
import {useNavigate, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

export default function LeftSidebar() {
    const navigate = useNavigate();
    const [recommendProfiles, setRecommendProfiles] = useState([]);
    const [loading, setLoading] = useState(true);

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
                            <li key={profile.id} className="profile-item">
                                <Link to={`/profile/${profile._id}`} className="profile-link">
                                    <img src={profile.profile_picture} alt={`${profile.username}'s avatar`} className="profile-avatar" />
                                    <span className="profile-username">{profile.username}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

}