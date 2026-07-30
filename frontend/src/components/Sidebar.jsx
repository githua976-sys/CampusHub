import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { user } = useAuth();

    return (
        <div
            style={{
                width: "220px",
                minHeight: "100vh",
                background: "#1f2937",
                color: "white",
                padding: "20px",
            }}
        >
            <h2>CampusHub</h2>

            <ul style={{ listStyle: "none", padding: 0 }}>

                {/* Everyone */}
                <li>
                    <Link to="/dashboard" style={{ color: "white" }}>
                        Dashboard
                    </Link>
                </li>

                {/* Admin */}
                {user?.role === "Admin" && (
                    <>
                        <li>
                            <Link to="/students" style={{ color: "white" }}>
                                Students
                            </Link>
                        </li>

                        <li>
                            <Link to="/lecturers" style={{ color: "white" }}>
                                Lecturers
                            </Link>
                        </li>

                        <li>
                            <Link to="/departments" style={{ color: "white" }}>
                                Departments
                            </Link>
                        </li>

                        <li>
                            <Link to="/courses" style={{ color: "white" }}>
                                Courses
                            </Link>
                        </li>
                    </>
                )}

                {/* Lecturer */}
                {user?.role === "Lecturer" && (
                    <>
                        <li>
                            <Link to="/attendance" style={{ color: "white" }}>
                                Attendance
                            </Link>
                        </li>

                        <li>
                            <Link to="/grades" style={{ color: "white" }}>
                                Grades
                            </Link>
                        </li>

                        <li>
                            <Link to="/notes" style={{ color: "white" }}>
                                Notes
                            </Link>
                        </li>
                    </>
                )}

                {/* Student */}
                {user?.role === "Student" && (
                    <>
                        <li>
                            <Link to="/notes" style={{ color: "white" }}>
                                My Notes
                            </Link>
                        </li>
                    </>
                )}

            </ul>
        </div>
    );
}