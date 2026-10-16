import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Grades() {
    const [grades, setGrades] = useState([]);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);

    const [student, setStudent] = useState("");
    const [course, setCourse] = useState("");
    const [score, setScore] = useState("");
    const [grade, setGrade] = useState("");
    const [semester, setSemester] = useState("");
    const [academicYear, setAcademicYear] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const getList = (data) =>
        Array.isArray(data) ? data : data.results || [];

    const fetchGrades = async () => {
        try {
            setError("");
            const response = await api.get("grades/");
            setGrades(getList(response.data));
        } catch (err) {
            console.error("Fetch grades error:", err);
            setError(
                err.response?.data?.detail ||
                "Failed to load grades. Check your login and API endpoint."
            );
        } finally {
            setLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await api.get("students/");
            setStudents(getList(response.data));
        } catch (err) {
            console.error("Fetch students error:", err);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await api.get("courses/");
            setCourses(getList(response.data));
        } catch (err) {
            console.error("Fetch courses error:", err);
        }
    };

    useEffect(() => {
        fetchGrades();
        fetchStudents();
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await api.post("grades/", {
                student,
                course,
                score,
                grade,
                semester,
                academic_year: academicYear,
            });

            alert("Grade added successfully!");

            setStudent("");
            setCourse("");
            setScore("");
            setGrade("");
            setSemester("");
            setAcademicYear("");

            await fetchGrades();
        } catch (err) {
            console.error("Add grade error:", err.response?.data);

            const data = err.response?.data;
            setError(
                typeof data === "object"
                    ? Object.entries(data)
                        .map(([key, value]) =>
                            `${key}: ${Array.isArray(value) ? value.join(", ") : value}`
                        )
                        .join(" | ")
                    : "Failed to add grade."
            );
        }
    };

    const deleteGrade = async (id) => {
        if (!window.confirm("Are you sure you want to delete this grade?")) {
            return;
        }

        try {
            await api.delete(`grades/${id}/`);
            await fetchGrades();
        } catch (err) {
            console.error("Delete grade error:", err.response?.data);
            setError("Failed to delete grade. Check your permissions.");
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Grades Management</h1>
            <p>Record and manage student academic results.</p>

            <hr />

            <h3>Add Grade</h3>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Student</label>
                    <br />
                    <select
                        value={student}
                        onChange={(e) => setStudent(e.target.value)}
                        required
                    >
                        <option value="">Select Student</option>
                        {students.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.username ?? s.user_details?.username ?? s.user}
                                {" - "}
                                {s.registration_number}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Course</label>
                    <br />
                    <select
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                    >
                        <option value="">Select Course</option>
                        {courses.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.code ?? c.course_code ?? ""}
                                {" "}
                                {c.name ?? c.title ?? ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Score</label>
                    <br />
                    <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Grade</label>
                    <br />
                    <input
                        type="text"
                        placeholder="e.g. A, B, C"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Semester</label>
                    <br />
                    <input
                        type="text"
                        placeholder="e.g. Semester 1"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Academic Year</label>
                    <br />
                    <input
                        type="text"
                        placeholder="e.g. 2026"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Add Grade</button>
            </form>

            {error && (
                <p style={{ color: "red", marginTop: "15px" }}>{error}</p>
            )}

            <hr />

            <h2>Grades List</h2>

            {loading ? (
                <p>Loading grades...</p>
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
                                <th>Student</th>
                                <th>Course</th>
                                <th>Score</th>
                                <th>Grade</th>
                                <th>Semester</th>
                                <th>Academic Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {grades.length === 0 ? (
                                <tr>
                                    <td colSpan="8">No grades found.</td>
                                </tr>
                            ) : (
                                grades.map((g) => (
                                    <tr key={g.id}>
                                        <td>{g.id}</td>
                                        <td>
                                            {g.student_name ??
                                                g.student_username ??
                                                g.student}
                                        </td>
                                        <td>
                                            {g.course_name ?? g.course}
                                        </td>
                                        <td>{g.score}</td>
                                        <td>{g.grade}</td>
                                        <td>{g.semester}</td>
                                        <td>{g.academic_year}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={() => deleteGrade(g.id)}
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