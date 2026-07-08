import { useState } from "react";
import "./Login.css";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

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

        console.log(response.data);

        console.log("TOKEN:", response.data.token);

       if (!response.data.token) {
    alert(response.data.message);
    return;
}

localStorage.setItem("token", response.data.token);

if (response.data.name) {
    localStorage.setItem("userName", response.data.name);
}

localStorage.setItem("userEmail", response.data.email);

navigate("/dashboard");

    } catch (error) {

        alert(error.response?.data?.message || "Invalid Email or Password");

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