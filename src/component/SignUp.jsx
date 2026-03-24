// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const { signup } = useAuth();
//     const navigate = useNavigate();

//     const handleSignup = async (e) => {
//         e.preventDefault();

//         // ✅ Check password match
//         if (password !== confirmPassword) {
//             alert("Passwords do not match ❌");
//             return;
//         }

//         try {
//             await signup(email, password);
//             alert("Account created successfully ✅");
//             navigate("/"); // go to home after signup
//         } catch (err) {
//             alert(err.message);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//             <form
//                 onSubmit={handleSignup}
//                 className="bg-white p-6 rounded shadow-md w-80"
//             >
//                 <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

//                 <input
//                     type="email"
//                     placeholder="Email"
//                     className="border p-2 mb-3 w-full"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />

//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="border p-2 mb-3 w-full"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />

//                 <input
//                     type="password"
//                     placeholder="Confirm Password"
//                     className="border p-2 mb-3 w-full"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />

//                 <button
//                     type="submit"
//                     className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 transition"
//                 >
//                     Sign Up
//                 </button>
//             </form>
//         </div>
//     );
// }
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match ❌");
            return;
        }

        try {
            await signup(email, password);
            alert("Account created successfully ✅");
            navigate("/"); // go to home after signup
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1470&q=80')",
            }}
        >
            <div className="bg-black/60 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-white">
                    Sign Up
                </h2>
                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded-md w-full text-green-400 border-white border focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded-md w-full text-green-400 border-white border focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        className="p-3 rounded-md w-full text-green-400 focus:outline-none border-white border focus:ring-2 focus:ring-green-500"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition"
                    >
                        Create Account
                    </button>
                </form>
                <p className="text-white text-center mt-4">
                    Already have an account?{" "}
                    <span
                        className="text-green-400 hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}