import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import '../styles/CreatePost.css';

export default function CreatePost({ onClose }) {
    const [formData, setContent] = useState(
        {
            image: '',
            title: '',
            description: ''
        }
    );
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContent((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log('Submitting form data:', JSON.stringify(formData)); // Log the form data before sending
            const response = await apiFetch('/post/create', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            if (response.message !== 'Post created successfully') {
                throw new Error('Failed to create post');
            }
            setContent('');

            onClose(); // Close the dialog after successful submission
        }

        catch (err) {
            setError(err.message || 'An error occurred');
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <div className="create-post-overlay">

            <div className="create-post-dialog">

                {/* Header */}
                <div className="create-post-header">

                    <h2>Create Post</h2>

                    <button
                        type="button"
                        className="create-post-close"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>


                {/* Error */}
                {error && (
                    <p className="create-post-error">
                        {error}
                    </p>
                )}


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="create-post-form"
                >

                    <div className="form-group">

                        <label htmlFor="image">
                            Image URL
                        </label>

                        <input
                            type="text"
                            id="image"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="title">
                            Title
                        </label>

                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Give your post a title"
                        />

                    </div>


                    <div className="form-group">

                        <label htmlFor="description">
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="What's on your mind?"
                            rows="5"
                        />

                    </div>


                    <button
                        type="submit"
                        className="create-post-submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Create Post"}
                    </button>

                </form>

            </div>

        </div>
    );
}