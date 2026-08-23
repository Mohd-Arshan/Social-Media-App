import "../styles/Profile.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Posts from '../components/posts';
import useFollowUser from '../context/follow';

export default function Profile() {

    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [me, setMe] = useState(false);

    const { followed, setFollowed, loading: followLoading, error: followError, toggleFollow } = useFollowUser();

    useEffect(() => {
        if (profile && profile.followers && user?._id) {
            setFollowed(profile.followers.includes(user._id));
        }
    }, [profile, user, setFollowed]);

    const handleFollowClick = async ({ userToFollowId }) => {
        await toggleFollow({ userToFollowId });
    }

    useEffect(() => {
        if (id === user?._id) {
            setMe(true);
        }
        else {
            setMe(false);
        }
        async function fetchProfile() {
            try {

                const data = await apiFetch(`/user/profile/${id}`);
                if (!data) {
                    throw new Error('No data received from the server');
                }
                setProfile(data);
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, [id, user?._id]);

    return (
        <div className="profile-page">

            {loading ? (
                <div className="profile-loading">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div className="profile-error">
                    <p>{error}</p>
                </div>
            ) : !profile ? (
                <div className="profile-error">
                    <p>Profile not found.</p>
                </div>
            ) : (
                <div className="profile-container">

                    <div className="profile-header">

                        {/* Cover */}
                        {profile.cover_picture ? (
                            <img
                                src={profile.cover_picture}
                                alt={`${profile.username}'s cover`}
                                className="cover-picture"
                            />
                        ) : (
                            <div className="default-cover">
                                No Cover Picture
                            </div>
                        )}

                        {/* Avatar */}
                        {profile.profile_picture ? (
                            <img
                                src={profile.profile_picture}
                                alt={`${profile.username}'s avatar`}
                                className="profile-avatar"
                            />
                        ) : (
                            <div className="default-avatar">
                                No Avatar
                            </div>
                        )}

                        {/* Name */}
                        {profile.full_name && (
                            <h1>{profile.full_name}</h1>
                        )}

                        {/* Username */}
                        <h1>@{profile.username}</h1>

                        {/* Bio */}
                        {profile.bio && (
                            <p>{profile.bio}</p>
                        )}

                    </div>


                    <div className="profile-stats">

                        <p>
                            <strong>
                                {profile.followers?.length || 0}
                            </strong>
                            Followers
                        </p>

                        <p>
                            <strong>
                                {profile.following?.length || 0}
                            </strong>
                            Following
                        </p>

                    </div>


                    {!me ? (
                        <div className="follow-button-container">

                            <button
                                className={`follow-button ${followed
                                        ? "unfollow"
                                        : "follow"
                                    }`}
                                onClick={() =>
                                    handleFollowClick({
                                        userToFollowId: profile._id
                                    })
                                }
                                disabled={followLoading}
                            >
                                {followLoading
                                    ? "Processing..."
                                    : followed
                                        ? "Unfollow"
                                        : "Follow"
                                }
                            </button>

                            {followError && (
                                <p className="error-message">
                                    {followError}
                                </p>
                            )}

                        </div>
                    ) : (
                        <div className="profile-actions">

                            {/* Edit Profile */}

                            <div className="edit-profile-button-container">
                                <button
                                    onClick={() =>
                                        alert(
                                            "Edit profile functionality not implemented yet."
                                        )
                                    }
                                >
                                    Edit Profile
                                </button>
                            </div>


                            {/* Create Post */}

                            <div className="create-post-container">

                                <button onClick={() => navigate('/create-post')} className="create-post-button"
                                >
                                    + Create Post
                                </button>

                            </div>

                        </div>
                    )}

                    <div className="profile-posts">
                        <Posts userId={id} isOwner={me} />
                    </div>

                </div>
            )}

        </div>
    );
}