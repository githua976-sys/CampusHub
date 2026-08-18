import { Routes, Route, Navigate } from "react-router-dom";

import Attendance from "../Pages/Attendance";
import Courses from "../Pages/courses";
import Dashboard from "../Pages/Dashboard";
import Departments from "../Pages/Departments";
import Grades from "../Pages/Grades";
import Lecturers from "../Pages/Lecturers";
import Login from "../Pages/Login";
import Notes from "../Pages/Notes";
import Students from "../Pages/Students";
import Unauthorized from "../Pages/Unauthorised";

import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/Layout";

export default function AppRoutes() {
    return (
        <Routes>

            {/* Redirect homepage to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Public */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* rest of your routes... */}

        </Routes>
    );
}