import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CreatePost({onClose}) {
    const { user } = useAuth();
    const [formData, setContent] = useState(
       { image : '',
        title : '',
        description : ''} 
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
        <div>
            <dialog open>
                <h2>Create Post</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label htmlFor ="image">Image URL:</label>
                    <input type="text" id="image" name="image" value={formData.image} onChange={handleChange} />
                    <label htmlFor ="title">Title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
                    <label htmlFor ="description">Description:</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                    <button type="submit" disabled = {loading}>
                        {loading ? 'Submiting...' : 'Submit'}
                    </button>
                </form>
            </dialog>
        </div>
    )
}