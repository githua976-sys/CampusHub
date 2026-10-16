import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Capitalize the first letter of strings safely
    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: "64px",               // Standard fixed navbar height
                padding: "0 32px",            // Clean, wide horizontal padding
                background: "#1e293b",        // Deep slate background to match your UI
                color: "white",
                borderBottom: "1px solid #334155", // Subtle bottom border separation
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
        >
            {/* Left Side: Brand Logo */}
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "700", tracking: "-0.025em" }}>
                🎓 CampusHub
            </h2>

            {/* Right Side: Clean Profile Section */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {user && (
                    <>
                        {/* Meta Text Stack */}
                        <div style={{ textAlign: "right", display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#f8fafc" }}>
                                {capitalize(user.username)}
                            </span>
                            <span style={{ fontSize: "12px", color: "#94a3b8", marginTop: "2px" }}>
                                {capitalize(user.role)}
                            </span>
                        </div>

                        {/* Visual Avatar Bubble */}
                        <div
                            style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                backgroundColor: "#2563eb", // Vibrant blue circle
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: "700",
                                fontSize: "14px",
                                textTransform: "uppercase",
                                userSelect: "none"
                            }}
                        >
                            {user.username ? user.username.charAt(0) : "U"}
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}
