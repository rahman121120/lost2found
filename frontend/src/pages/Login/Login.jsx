import { useState } from "react";
import "./Login.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin() {

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            if (!response.data.token) {
                toast.error(response.data.message);
                return;
            }

            // Save login information
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", response.data.name);
            localStorage.setItem("userEmail", response.data.email);

            toast.success(response.data.message);

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message || "Invalid Email or Password"
            );

        }

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Lost2Found</h1>

                <p>Campus Lost & Found Management System</p>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>

                    Login

                </button>

            </div>

        </div>

    );

}

export default Login;