import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function Interface() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }   

    return (
        <div>
            <h1>Welcome, {user?.username}!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Interface;