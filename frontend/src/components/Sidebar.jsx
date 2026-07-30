import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    FaTachometerAlt,
    FaUserGraduate,
    FaChalkboardTeacher,
    FaBuilding,
    FaBook,
    FaClipboardList,
    FaFileAlt,
    FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
    const { user, logout } = useAuth();

    return (
        <div
            style={{
                width: "240px",
                minHeight: "100vh",
                background: "#1e293b",
                color: "white",
                padding: "20px",
            }}
        >
            <h2 style={{ marginBottom: "30px" }}>
                🎓 CampusHub
            </h2>

            <ul
                style={{
                    listStyle: "none",
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                {/* Dashboard */}
                <li>
                    <Link
                        to="/dashboard"
                        style={{
                            color: "white",
                            textDecoration: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <FaTachometerAlt />
                        Dashboard
                    </Link>
                </li>

                {/* Admin */}
                {user?.role === "Admin" && (
                    <>
                        <li>
                            <Link
                                to="/students"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <FaUserGraduate />
                                Students
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/lecturers"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <FaChalkboardTeacher />
                                Lecturers
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/departments"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <FaBuilding />
                                Departments
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/courses"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <FaBook />
                                Courses
                            </Link>
                        </li>
                    </>
                )}

                {/* Lecturer */}
                {user?.role === "Lecturer" && (
                    <>
                        <li>
                            <Link
                                to="/attendance"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <FaClipboardList />
                                Attendance
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/grades"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <FaClipboardList />
                                Grades
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/notes"
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <FaFileAlt />
                                Notes
                            </Link>
                        </li>
                    </>
                )}

                {/* Student */}
                {user?.role === "Student" && (
                    <li>
                        <Link
                            to="/notes"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <FaFileAlt />
                            My Notes
                        </Link>
                    </li>
                )}

                {/* Logout */}
                <li style={{ marginTop: "40px" }}>
                    <button
                        onClick={logout}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "none",
                            background: "#ef4444",
                            color: "white",
                            cursor: "pointer",
                            borderRadius: "6px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                        }}
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}