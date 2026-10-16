import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Departments() {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDepartments = async () => {
        try {
            setError("");

            const response = await api.get("departments/");
            const data = response.data;

            setDepartments(
                Array.isArray(data) ? data : data.results || []
            );
        } catch (err) {
            console.error("Fetch departments error:", err);
            setError(
                err.response?.data?.detail ||
                "Failed to load departments."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setError("");

            await api.post("departments/", {
                name: name.trim(),
                description: description.trim(),
            });

            alert("Department added successfully!");

            setName("");
            setDescription("");

            await fetchDepartments();
        } catch (err) {
            console.error("Add department error:", err.response?.data);
            setError(
                err.response?.data?.name?.[0] ||
                err.response?.data?.detail ||
                err.response?.data?.description?.[0] ||
                "Failed to add department. Check the required fields and permissions."
            );
        }
    };

    const deleteDepartment = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`departments/${id}/`);
            alert("Department deleted successfully!");
            await fetchDepartments();
        } catch (err) {
            console.error("Delete department error:", err.response?.data);
            alert(
                err.response?.data?.detail ||
                "Failed to delete department. It may have associated students or courses."
            );
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Departments Management</h1>
            <p>Manage academic departments in CampusHub.</p>

            <hr />

            <form onSubmit={handleSubmit}>
                <h3>Add Department</h3>

                <div style={{ marginBottom: "15px" }}>
                    <input
                        type="text"
                        placeholder="Department Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                    />
                </div>

                <button type="submit">
                    Add Department
                </button>
            </form>

            <hr />

            <h2>Departments List</h2>

            {error && (
                <p style={{ color: "red" }}>{error}</p>
            )}

            {loading ? (
                <p>Loading departments...</p>
            ) : (
                <table
                    border="1"
                    cellPadding="10"
                    width="100%"
                    style={{ borderCollapse: "collapse" }}
                >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Department Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {departments.length === 0 ? (
                            <tr>
                                <td colSpan="4">
                                    No departments found.
                                </td>
                            </tr>
                        ) : (
                            departments.map((dept) => (
                                <tr key={dept.id}>
                                    <td>{dept.id}</td>
                                    <td>{dept.name}</td>
                                    <td>{dept.description || "—"}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteDepartment(dept.id)
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
            )}
        </div>
    );
}