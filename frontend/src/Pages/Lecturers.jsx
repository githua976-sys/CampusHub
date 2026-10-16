import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Lecturers() {
    const [lecturers, setLecturers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLecturers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("lecturers/");
            const data = response.data;

            setLecturers(
                Array.isArray(data) ? data : data.results || []
            );
        } catch (err) {
            console.error("Error fetching lecturers:", err);
            setError(
                err.response?.data?.detail ||
                "Failed to load lecturers. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLecturers();
    }, []);

    return (
        <div style={{ padding: "30px" }}>
            <h1>Lecturers Management</h1>
            <p>View and manage lecturer records in CampusHub.</p>

            <hr />

            <h2>Lecturers List</h2>

            {loading ? (
                <p>Loading lecturers...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <table
                    border="1"
                    cellPadding="10"
                    width="100%"
                    style={{
                        borderCollapse: "collapse",
                        textAlign: "left"
                    }}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Employee Number</th>
                            <th>Department</th>
                        </tr>
                    </thead>

                    <tbody>
                        {lecturers.length === 0 ? (
                            <tr>
                                <td colSpan="4">
                                    No lecturers found.
                                </td>
                            </tr>
                        ) : (
                            lecturers.map((lecturer) => (
                                <tr key={lecturer.id}>
                                    <td>{lecturer.id}</td>
                                    <td>
                                        {lecturer.username ??
                                            lecturer.user_details?.username ??
                                            lecturer.user}
                                    </td>
                                    <td>
                                        {lecturer.employee_number ?? "N/A"}
                                    </td>
                                    <td>
                                        {lecturer.department_name ??
                                            lecturer.department?.name ??
                                            lecturer.department ??
                                            "N/A"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}