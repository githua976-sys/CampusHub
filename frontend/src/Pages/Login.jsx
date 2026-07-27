import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        try {
            const response = await axios.post("token/", {
                username,
                password,
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            alert("Login Successful!");

            navigate("/dashboard");

        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>

                <h2>CampusHub Login</h2>

                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    );
}