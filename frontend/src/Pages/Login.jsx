import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            // Get JWT tokens
            const response = await api.post("token/", {
                username,
                password,
            });

            const { access, refresh } = response.data;

            // Save tokens and load user
            await login(access, refresh);

            // Redirect to dashboard
            navigate("/dashboard");

        } catch (err) {
            console.error(err);
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>

                <h2>CampusHub Login</h2>

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

            </form>
        </div>
    );
}