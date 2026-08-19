import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Interface from "./pages/Interface";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

//context
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
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
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
