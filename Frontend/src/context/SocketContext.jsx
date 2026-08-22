import { createContext, useContext, useEffect } from "react";
import socket from "../services/socket"; // Import the socket instance from the service file
import { useAuth } from "./AuthContext"; // Import the useAuth hook to access the user token

const SocketContext = createContext(null);


// SocketProvider component to wrap the application and provide the socket instance
export function SocketProvider({ children}) {

    //const { token } = useAuth(); // Get the user token from the AuthContext

    useEffect(() => {
        /*console.log("SocketProvider useEffect triggered with token:", token);
        if (!token) {
            console.error("Token is not provided to SocketProvider");
            return;
        }
        // Connect to the socket server when the component mounts
        socket.auth = { token }; // Attach the token for authentication
        */
        socket.connect();

        return () => {
            // Disconnect from the socket server when the component unmounts
            socket.disconnect();
        };
    }, [/*token*/]); // Empty dependency array ensures this effect runs only once on mount and unmount

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    const socket = useContext(SocketContext);

    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return { socket };
}