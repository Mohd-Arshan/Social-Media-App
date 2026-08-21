import {useState, useEffect} from 'react';
import {apiFetch} from '../services/api';


export default function getPostsBy ({userId}){
    //console.log("Fetching posts for userId:", userId); // debugging log
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await apiFetch(`/post/getPostsByUserId/${userId}`);
                if (!data){
                    throw new Error('No data received from the server');
                }
                setPosts(data);
                console.log("Fetched posts:", data); // debugging log
            }
            catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, [userId]);

    return (
        <div>
            {loading 
            ? (<p>Loading...</p>)
            : error 
                ? (<p style={{ color: 'red' }}>{error}</p>)
                : (
                    <ul>
                        {posts.map(post => (
                            <li key={post._id}>
                                < img src={post.image} alt={post.title} />
                            </li>   
                        ))}
                    </ul>
                )
            }
        </div>
    );
}