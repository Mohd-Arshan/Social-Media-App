import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {apiFetch} from '../services/api';
import {useAuth} from '../context/AuthContext';
import Posts from '../components/posts';
import useFollowUser from '../context/follow';

export default function Profile() {
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
     
    const handleFollowClick = async ({userToFollowId}) => {
        await toggleFollow({userToFollowId});
    }

    useEffect(() => {
        if(id === user?._id) {
            setMe(true);
        }
        else {
            setMe(false);
        }
        async function fetchProfile() {
            try {

                const data = await apiFetch(`/user/profile/${id}`);
                if(!data){
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
    }, [id]);

    return (
        <div>
            {loading 
            ? (<p>Loading...</p>)
            : error 
                ? (<p style={{ color: 'red' }}>{error}</p>)
                : !me ? (
                    <div>
                        <div className="profile-header">
                            
                            {profile?.profile_picture? (
                                <img src={profile.profile_picture} alt={`${profile.username}'s avatar`} />
                            ) : (
                                <div className="default-avatar">No Avatar</div>
                            )}
                            <h1>{profile.username}</h1>
                            <p>{profile.bio}</p>
                        </div>
                        <div className="follow-button-container">
                            <button
                                className={`follow-button ${followed ? 'unfollow' : 'follow'}`}
                                onClick={() => handleFollowClick({userToFollowId: profile._id})}
                            >
                                {followLoading ? 'Processing...' : (followed ? 'Unfollow' : 'Follow')}
                            </button>
                            {followError && <p className="error-message">{followError}</p>}
                        </div>
                        <div className="profile-posts">
                            <Posts userId={id} />   
                        </div>  
                    </div>
                ) : (
                    <div>
                        <div className="profile-header">
                            <img src={profile.profile_picture} alt={`${profile.username}'s avatar`} />
                            <h1>{profile.username}</h1>
                            <p>{profile.bio}</p>
                            <button>Edit Profile</button>
                            <button>Create Post</button>
                        </div>
                        <div className="profile-posts">
                            <Posts userId={id} />
                        </div>
                    </div>
                )
            }
        </div>
    );
}