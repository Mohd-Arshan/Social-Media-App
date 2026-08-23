import "../styles/MidFeed.css";
import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { Link } from 'react-router-dom';
import useLikePost from '../context/like';
import { useAuth } from '../context/AuthContext';


function PostCard({ post }) {
    const { user } = useAuth();
    const isInitinallyLiked = post.likes && post.likes.includes(user._id);
    const { liked, setLiked, loading, error, toggleLike } = useLikePost(isInitinallyLiked);

    console.log("PostCard state:", { liked, loading, error }); // debugging log
    const handleLikeClick = async () => {
        await toggleLike({ postId: post._id });
    }


    return (
        <li key={post._id} className="post-item">
            <div className="post-image-container">
                <img src={post.image} alt={post.title} className="post-image" />
            </div>
            <div className="post-details">
                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>
                <div className="post-author">
                    <span>Posted by</span>

                    <Link
                        to={`/profile/${post.userId}`}
                        className="profile-link"
                    >
                        @{post.username || "test1"}
                    </Link>
                </div>
                <div className="like-button-container">
                    <button
                        className={`like-button ${liked ? "unlike" : "like"}`}
                        onClick={handleLikeClick}
                        disabled={loading}
                        aria-label={liked ? "Unlike post" : "Like post"}
                    >
                        <span className="heart-icon">
                            {liked ? "♥" : "♡"}
                        </span>
                    </button>

                    {error && <p className="error-message">{error}</p>}
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </li>
    );
}

export default function getRecommendedPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await apiFetch("/post/recommend-posts");
                if (!data) {
                    throw new Error('No data received from the server');
                }
                console.log("Recommended posts data:", data);
                setPosts(data);
            }
            catch (error) {
                console.error("Error fetching recommended posts:", error);
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="recommended-posts">
            <h2>Recommended Posts</h2>
            {loading && <p>Loading recommended posts...</p>}
            {error && <p className="error-message">{error}</p>}
            <ul className="post-list">
                {posts.map((post) => (
                    <PostCard key={post._id} post={post} />
                ))}
            </ul>
        </div>
    )
}