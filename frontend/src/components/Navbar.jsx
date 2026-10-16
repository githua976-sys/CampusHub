import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const linkStyle = {
        color: "white",
        textDecoration: "none",
        fontWeight: "500",
    };

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 30px",
                background: "#1f2937",
                color: "white",
            }}
        >
            <h2>🎓 CampusHub</h2>

            <div style={{ display: "flex", gap: "20px" }}>
                <Link to="/dashboard" style={linkStyle}>
                    Dashboard
                </Link>

                <Link to="/students" style={linkStyle}>
                    Students
                </Link>

                <Link to="/lecturers" style={linkStyle}>
                    Lecturers
                </Link>

                <Link to="/departments" style={linkStyle}>
                    Departments
                </Link>

                <Link to="/courses" style={linkStyle}>
                    Courses
                </Link>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {user && (
                    <span>
                        👤 {user.username} ({user.role})
                    </span>
                )}
            </div>
        </nav>
    );
}