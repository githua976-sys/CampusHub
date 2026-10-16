import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Courses() {
    const [courses, setCourses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCourses = async () => {
        try {
            const response = await api.get("courses/");
            const data = response.data;
            setCourses(Array.isArray(data) ? data : data.results || []);
        } catch (err) {
            console.error("Courses error:", err);
            setError("Failed to load courses. Check your login and backend.");
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const response = await api.get("departments/");
            const data = response.data;
            setDepartments(Array.isArray(data) ? data : data.results || []);
        } catch (err) {
            console.error("Departments error:", err);
        }
    };

    useEffect(() => {
        fetchCourses();
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("courses/", {
                code: code.trim(),
                name: name.trim(),
                department: department,
            });

            alert("Course added successfully!");
            setCode("");
            setName("");
            setDepartment("");
            await fetchCourses();
        } catch (err) {
            console.error("Add course error:", err.response?.data);
            setError(
                JSON.stringify(err.response?.data || "Failed to add course.")
            );
        }
    };

    const deleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) {
            return;
        }

        try {
            await api.delete(`courses/${id}/`);
            await fetchCourses();
        } catch (err) {
            console.error("Delete course error:", err.response?.data);
            setError("Failed to delete course.");
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Courses Management</h1>
            <p>Manage academic courses in CampusHub.</p>

            <hr />

            <h3>Add Course</h3>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        placeholder="Course Code (e.g. CSC101)"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        placeholder="Course Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Add Course</button>
            </form>

            {error && (
                <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
            )}

            <hr />

            <h2>Courses List</h2>

            {loading ? (
                <p>Loading courses...</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table
                        border="1"
                        cellPadding="10"
                        width="100%"
                        style={{ borderCollapse: "collapse" }}
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Course Code</th>
                                <th>Course Name</th>
                                <th>Department</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {courses.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No courses found.</td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>
                                            {course.code ??
                                                course.course_code ??
                                                "N/A"}
                                        </td>
                                        <td>{course.name ?? "N/A"}</td>
                                        <td>
                                            {course.department_name ??
                                                course.department?.name ??
                                                course.department ??
                                                "N/A"}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    deleteCourse(course.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}