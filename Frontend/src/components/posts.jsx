import {useState, useEffect} from 'react';
import {apiFetch} from '../services/api';
import "../styles/Posts.css";


export default function getPostsBy({ userId, isOwner = false }) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [openMenu, setOpenMenu] = useState(null);

    useEffect(() => {

        async function fetchPosts() {

            try {

                setLoading(true);
                setError(null);

                const data = await apiFetch(
                    `/post/getPostsByUserId/${userId}`
                );

                if (!data) {
                    throw new Error(
                        "No data received from the server"
                    );
                }

                setPosts(data);

            } catch (error) {

                setError(error.message);

            } finally {

                setLoading(false);

            }
        }

        if (userId) {
            fetchPosts();
        }

    }, [userId]);

    const handleEdit = (post) => {

        setOpenMenu(null);
        console.log("Edit post:", post);

        //i have to implement the edit functionality here, maybe open a modal or redirect to an edit page
        
    };

    const handleDelete = async (postId) => {

        setOpenMenu(null);
        console.log("Delete post:", postId);

        // i have to implement the delete functionality here, maybe call an API to delete the post and then update the state
    };

    if (loading) {
        return (
            <div className="posts-loading">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="posts-error">
                <p>{error}</p>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="no-posts">

                <h3>No posts yet</h3>

                <p>
                    This user hasn't created any posts.
                </p>

            </div>
        );
    }


    return (
        <div className="profile-posts-container">

            <div className="profile-post-list">

                {posts.map((post) => (

                    <article
                        key={post._id}
                        className="profile-post"
                    >

                        <div className="profile-post-header">

                            <div className="post-user-info">

                                <img
                                    src={
                                        post.profile_picture ||
                                        "/default-profile.png"
                                    }
                                    alt={
                                        `${post.username || "User"}'s profile`
                                    }
                                    className="post-user-avatar"
                                />

                                <div className="post-user-details">

                                    <span className="post-username">
                                        {post.username || "User"}
                                    </span>

                                    {post.createdAt && (
                                        <span className="post-date">
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString()}
                                        </span>
                                    )}

                                </div>

                            </div>


                            {isOwner && (
                                <div className="post-menu">

                                    <button
                                        className="post-menu-button"
                                        onClick={() =>
                                            setOpenMenu(
                                                openMenu === post._id
                                                    ? null
                                                    : post._id
                                            )
                                        }
                                    >
                                        ⋮
                                    </button>


                                    {openMenu === post._id && (

                                        <div className="post-menu-dropdown">

                                            <button
                                                onClick={() =>
                                                    handleEdit(post)
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-option"
                                                onClick={() =>
                                                    handleDelete(
                                                        post._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    )}

                                </div>
                            )}

                        </div>

                        <div className="profile-post-image-container">

                            <img
                                src={post.image}
                                alt={post.title}
                                className="profile-post-image"
                            />

                        </div>


                        <div className="profile-post-content">

                            {/* Like count */}

                            <div className="profile-post-meta">

                                <span className="like-count">
                                    ♥ {post.likes?.length || 0}
                                </span>

                            </div>


                            {/* Title */}

                            <h3 className="profile-post-title">
                                {post.title}
                            </h3>


                            {/* Description */}

                            {post.description && (
                                <p className="profile-post-description">
                                    {post.description}
                                </p>
                            )}

                        </div>

                    </article>

                ))}

            </div>

        </div>
    );
}