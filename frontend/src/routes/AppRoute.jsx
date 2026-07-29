import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Students from "../pages/Students";
import Lecturers from "../pages/Lecturers";
import Departments from "../pages/Departments";
import Courses from "../pages/Courses";
import Attendance from "../pages/Attendance";
import Grades from "../pages/Grades";
import Notes from "../pages/Notes";
import Unauthorized from "../pages/Unauthorized";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Admin */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["Admin"]}
                    />
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/students" element={<Students />} />
                <Route path="/lecturers" element={<Lecturers />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/courses" element={<Courses />} />
            </Route>

            {/* Lecturer */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["Lecturer"]}
                    />
                }
            >
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/grades" element={<Grades />} />
            </Route>

            {/* Student */}
            <Route
                element={
                    <ProtectedRoute
                        allowedRoles={["Student"]}
                    />
                }
            >
                <Route path="/notes" element={<Notes />} />
            </Route>

        </Routes>
    );
}