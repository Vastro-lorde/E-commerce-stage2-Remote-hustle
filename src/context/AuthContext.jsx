import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

// 1️⃣ Create context
const AuthContext = createContext();

// 2️⃣ Hook to use the context
export const useAuth = () => useContext(AuthContext);

// 3️⃣ Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // store logged-in user
    const [loading, setLoading] = useState(true); // loading state while checking auth

    // Listen for auth state changes
    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    // Signup function
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Login function
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout function
    const logout = () => {
        return signOut(auth);
    };

    // Context value
    const value = {
        user,
        loading,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Wait for Firebase to initialize */}
        </AuthContext.Provider>
    );
};