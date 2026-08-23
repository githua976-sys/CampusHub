import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
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
            {/* Logo */}
            <h2>CampusHub</h2>

            {/* Navigation Links */}
            <div style={{ display: "flex", gap: "20px" }}>
                <Link to="/dashboard" style={{ color: "white" }}>
                    Dashboard
                </Link>

                <Link to="/students" style={{ color: "white" }}>
                    Students
                </Link>

                <Link to="/lecturers" style={{ color: "white" }}>
                    Lecturers
                </Link>

                <Link to="/departments" style={{ color: "white" }}>
                    Departments
                </Link>

                <Link to="/courses" style={{ color: "white" }}>
                    Courses
                </Link>
            </div>

            {/* User Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                {user && (
                    <>
                        <span>
                            👤  ({user.role})
                        </span>

                        
                    </>
                )}
            </div>
        </nav>
    );
}