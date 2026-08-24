import { useState, useEffect } from 'react';
import { apiFetch } from '../services/api';
import { useAuth } from '../context/AuthContext';
import "../styles/EditProfile.css";

export default function EditProfile() {
    // Added updateContextUser assuming your AuthContext provides a sync method
    const { user, updateContextUser } = useAuth();

    const [formData, setFormData] = useState({
        full_name: '',
        bio: '',
        profile_picture: '',
        cover_picture: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Sync form data when the user context loads or changes
    useEffect(() => {
        if (user) {
            setFormData({
                full_name: user.full_name || '',
                bio: user.bio || '',
                profile_picture: user.profile_picture || '',
                cover_picture: user.cover_picture || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent crashes if user context isn't ready
        if (!user?._id) {
            setError("User not authenticated");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await apiFetch(`/user/update/${user._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (updateContextUser) {
                updateContextUser(updatedUser);
            }

            alert('Profile updated successfully!');
        } catch (err) {
            setError(err.message);
            alert('Error updating profile: ' + err.message);
        } finally {
            setLoading(false); // Clean up loading state reliably
        }
    };

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="edit-profile-page">

            <div className="edit-profile-card">

                {/* Header */}
                <div className="edit-profile-header">
                    <div>
                        <span className="edit-profile-eyebrow">
                            ACCOUNT SETTINGS
                        </span>

                        <h1>Edit Profile</h1>

                        <p>
                            Update your profile information and make it yours.
                        </p>
                    </div>

                    <div className="edit-profile-header-decoration"></div>
                </div>


                {/* Error */}
                {error && (
                    <div className="edit-profile-error">
                        {error}
                    </div>
                )}


                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="edit-profile-form"
                >

                    {/* Full Name */}
                    <div className="edit-form-group">

                        <label htmlFor="full_name">
                            Full Name
                        </label>

                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />

                    </div>


                    {/* Bio */}
                    <div className="edit-form-group">

                        <div className="edit-label-row">
                            <label htmlFor="bio">
                                Bio
                            </label>

                            <span>
                                Tell people about yourself
                            </span>
                        </div>

                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder="Write something about yourself..."
                            rows="5"
                        />

                    </div>


                    {/* Profile Picture */}
                    <div className="edit-form-group">

                        <label htmlFor="profile_picture">
                            Profile Picture URL
                        </label>

                        <input
                            type="text"
                            id="profile_picture"
                            name="profile_picture"
                            value={formData.profile_picture}
                            onChange={handleChange}
                            placeholder="https://example.com/profile.jpg"
                        />

                    </div>


                    {/* Cover Picture */}
                    <div className="edit-form-group">

                        <label htmlFor="cover_picture">
                            Cover Picture URL
                        </label>

                        <input
                            type="text"
                            id="cover_picture"
                            name="cover_picture"
                            value={formData.cover_picture}
                            onChange={handleChange}
                            placeholder="https://example.com/cover.jpg"
                        />

                    </div>


                    {/* Buttons */}
                    <div className="edit-profile-actions">

                        <button
                            type="button"
                            className="edit-profile-cancel"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="edit-profile-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Updating..."
                                : "Save Changes"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
