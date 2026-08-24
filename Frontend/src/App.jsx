import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Interface from "./pages/Interface";
import Profile from "./pages/Profile";
import ChatPage from "./pages/ChatPage";
import Inbox from "./pages/Inbox";
import CreatePost from "./components/createPost";
import EditPost from "./components/editPost";
import EditProfile from "./pages/EditProfile";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

//context
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route 
                  path="/" 
                  element={<Login />} 
                />

                <Route 
                  path="/register" 
                  element={<Register />} 
                />

                <Route 
                  path="/register" 
                  element={<Register />} 
                />

                <Route 
                  path="/login" 
                  element={<Login />}
                />
                
                <Route 
                    path="/interface" 
                    element={
                        <ProtectedRoute>
                            <Interface />
                        </ProtectedRoute>
                    } 
                />
                
                <Route 
                    path="profile/:id"
                    element={<Profile/>}
                />

                <Route 
                    path="create-post"
                    element={<CreatePost/>}
                />

                <Route 
                    path="inbox"
                    element={
                        <ProtectedRoute>
                            <Inbox />
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="chat/:senderId"
                    element={
                        <ProtectedRoute>
                            <SocketProvider>
                                <ChatPage />
                            </SocketProvider>
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="edit-post/:postId"
                    element={
                        <ProtectedRoute>
                            <EditPost />
                        </ProtectedRoute>
                    }
                />

                <Route 
                    path="edit-profile"
                    element={
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    }
                />
                

            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
