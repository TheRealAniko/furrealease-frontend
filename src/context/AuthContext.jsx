import { useEffect, useState } from "react";
import { me, signin } from "../data/auth.js";
import { toast } from "react-toastify";
import { AuthContext } from ".";

const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkSession, setCheckSession] = useState(true);
    const [user, setUser] = useState(null);

    // 👉 Wenn checkSession aktiv ist, wird geprüft ob der User eingeloggt ist
    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setCheckSession(false);
                return; // 🧠 Wenn kein Token vorhanden → gar nicht erst `me()` ausführen
            }

            try {
                const user = await me();
                setUser(user);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Auth check failed:", error);
                localStorage.removeItem("token");
            } finally {
                setCheckSession(false);
            }
        };

        if (checkSession) getUser();
    }, [checkSession]);

    const signOut = async () => {
        try {
            localStorage.removeItem("token"); // ✅ JWT entfernen
            localStorage.removeItem("user"); // ✅ optional, falls gespeichert

            setIsAuthenticated(false);
            setUser(null);

            toast.success("You have been logged out");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logIn = async (credentials) => {
        try {
            const res = await signin(credentials);
            toast.success(res.success);
            setCheckSession(true);
        } catch (err) {
            toast.error(err.message || "Sign In failed");
            throw err;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                logIn,
                signOut,
                user,
                setIsAuthenticated,
                setCheckSession,
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
