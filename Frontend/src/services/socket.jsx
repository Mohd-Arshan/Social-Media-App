/*
   Connect to the Socket.IO server with credentials and autoConnect set to false.
   Attach the user token to the socket instance for authentication purposes.
   Token in Cookie is automatically sent with requests due to withCredentials: true.
*/

import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    withCredentials: true,
    autoConnect: false,
});

export default socket;