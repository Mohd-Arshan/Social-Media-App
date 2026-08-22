import {createContext, useContext, useEffect, useState} from "react";
import { apiFetch } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchUser() {
        try {
            const data = await apiFetch("/auth/me");
            setUser(data.user);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    async function logout() {
        try {
            await apiFetch("auth/logout", { method: "POST" });
            setUser(null);
        } catch (error) {
            console.error("Failed to logout:", error);
        }  
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}