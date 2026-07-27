import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div
            style={{
                width: "200px",
                height: "100vh",
                background: "#F3F4F6",
                position: "fixed",
                padding: "20px"
            }}
        >
            <h3>Menu</h3>

            <p><Link to="/dashboard">Dashboard</Link></p>
            <p><Link to="/students">Students</Link></p>
            <p><Link to="/lecturers">Lecturers</Link></p>
            <p><Link to="/departments">Departments</Link></p>
            <p><Link to="/courses">Courses</Link></p>
            <p><Link to="/attendance">Attendance</Link></p>
            <p><Link to="/grades">Grades</Link></p>
            <p><Link to="/notes">Notes</Link></p>
        </div>
    );
}