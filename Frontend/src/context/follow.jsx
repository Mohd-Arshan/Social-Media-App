import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function useFollowUser(initialFollowState = false) {
    const [followed, setFollowed] = useState(initialFollowState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    
    const toggleFollow = async ({userToFollowId}) => {
        if(!user._id || !userToFollowId) return false;

        setLoading(true);
        setError(null);


        const endpoint = followed ? "unfollowById" : "followById";

        try {
            const response = await apiFetch(`/follow/${endpoint}`, {
                method: "POST",
                body: JSON.stringify({userToFollowId }),
            });

            setFollowed((prevFollowed) => !prevFollowed);
            return true;
        }
        catch (err) {
            setError(err.message || "Action failed");
            return false;
        }
        finally {
            setLoading(false);
        }

    };

    return { followed, setFollowed, loading, error, toggleFollow };
}