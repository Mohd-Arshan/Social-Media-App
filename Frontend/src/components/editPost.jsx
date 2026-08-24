import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiFetch } from '../services/api';
import "../styles/EditPost.css";

export default function EditPost() {

    const postId = useParams().postId;
    const [post, setPost] = useState({
        title: '',
        description: '',
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await apiFetch(`/post/getPostById/${postId}`);
                setPost(data);
                console.log(data);
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [postId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await apiFetch(`/post/update/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify(post),
            });

            console.log('Post updated successfully');
            setSuccess(true);
            setLoading(false);
        }
        catch (error) {
            console.error('Error updating post:', error);
            setError('Failed to update post. Please try again.');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="edit-post-page">

            <div className="edit-post-card">

                {/* Header */}
                <div className="edit-post-header">

                    <div>
                        <span className="edit-post-eyebrow">
                            POST SETTINGS
                        </span>

                        <h1>Edit Post</h1>

                        <p>
                            Update the content of your post.
                        </p>
                    </div>

                    <div className="edit-post-decoration"></div>

                </div>


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="edit-post-form"
                >

                    {/* Title */}
                    <div className="edit-post-group">

                        <label htmlFor="title">
                            Title
                        </label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            placeholder="Give your post a title"
                        />

                    </div>


                    {/* Description */}
                    <div className="edit-post-group">

                        <div className="edit-post-label-row">

                            <label htmlFor="description">
                                Description
                            </label>

                            <span>
                                Tell your story
                            </span>

                        </div>

                        <textarea
                            id="description"
                            name="description"
                            value={post.description}
                            onChange={handleChange}
                            placeholder="What's on your mind?"
                            rows="6"
                        />

                    </div>


                    {/* Error */}
                    {error && (
                        <div className="edit-post-error">
                            {error}
                        </div>
                    )}


                    {/* Actions */}
                    <div className="edit-post-actions">

                        <button
                            type="button"
                            className="edit-post-cancel"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="edit-post-submit"
                            disabled={success}
                        >
                            {success
                                ? "✓ Updated!"
                                : "Update Post"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
