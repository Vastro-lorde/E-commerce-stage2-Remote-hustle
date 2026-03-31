
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from 'react-icons/hi';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await login(email, password);
            alert("Login successful ✅");
            navigate("/");
        } catch (err) {
            alert("Login Unsuccessful");
        }
    };

    return (
        <div className="relative w-full h-screen flex items-center justify-center">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute w-full h-full object-cover"
            >
                <source src="https://www.shutterstock.com/shutterstock/videos/3919197111/preview/stock-footage-santa-fe-new-mexico-usa-june-slow-motion-a-vibrant-outdoor-market-in-new-mexico.webm" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute w-full h-full bg-black/50"></div>

            {/* Login Form */}
            <div className="relative z-10 bg-white/90 p-8 rounded-xl shadow-lg w-80 sm:w-96">
                <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
                    >
                        {showPassword ? <HiEyeOff size={22} /> : <HiEye size={22} />}
                    </button>
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition font-semibold"
                >
                    Login
                </button>

                <p className="text-center text-sm text-gray-700 mt-4">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-green-600 cursor-pointer hover:underline"
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}
