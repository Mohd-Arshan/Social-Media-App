import {useState,useEffect} from 'react';
import {apiFetch} from '../services/api';
import { Link } from 'react-router-dom';


export default function getRecommendedPosts (){
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const data = await apiFetch("/post/recommend-posts");
                if(!data){
                    throw new Error('No data received from the server');
                }
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
        <div>
            {loading 
            ? (<p>Loading...</p>)
            : error 
                ? (<p style={{ color: 'red' }}>{error}</p>)
                : (
                    <ul>
                        {posts.map(post => (
                            <li key={post._id}>

                                <div className= "post-image-container">
                                    <img src={post.image} alt={post.caption} />
                                </div>

                                <div className= "post-image-data-container">
                                    <p>{post.title}</p>
                                    <p>{post.description}</p>

                                    <Link to={`/profile/${post.userId}`} className="profile-link">
                                        <p>Posted by: {post.username || "test1"}</p>
                                    </Link>
                                    
                                </div>

                            </li>   
                        ))}
                    </ul>
                )
            }
        </div>
        
        
    )
}