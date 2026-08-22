import { useState, useEffect } from "react";
import { apiFetch } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function useLikePost(initialLikeState = false){
    const [liked, setLiked] = useState(initialLikeState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    const toggleLike = async ({postId}) => {
        if(!user._id || !postId) return false;

        setLoading(true);
        setError(null);

        const endpoint = liked ? "unlikeById" : "likeById";

        try {
            await apiFetch(`/like/${endpoint}`, {
                method: "POST",
                body: JSON.stringify({postId}),
            });

            setLiked((prevLiked) => !prevLiked);
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

    return { liked, setLiked, loading, error, toggleLike };
}
