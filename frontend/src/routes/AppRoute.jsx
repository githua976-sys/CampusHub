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

            {/* Public routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/lecturers" element={<Lecturers />} />
                    <Route path="/departments" element={<Departments />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/grades" element={<Grades />} />
                    <Route path="/notes" element={<Notes />} />

                </Route>
            </Route>

            {/* Catch unknown routes */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />

        </Routes>
    );
}