import { useAuth } from "../context/AuthContext";
import LeftSidebar  from "../components/leftSidebar";
import MidFeed from "../components/midFeed";
import RightSidebar from "../components/rightSidebar";

function Interface() {
    const { user, logout } = useAuth();

    return (
        <div className="interface-container">
            <div className="left-sidebar">
                <LeftSidebar />
            </div>
            <div className="mid-feed">
                <MidFeed />
            </div>
            <div className="right-sidebar">
                <RightSidebar />
            </div>
        </div>
    );
}

export default Interface;