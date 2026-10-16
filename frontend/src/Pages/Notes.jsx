
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get("/notes/");

                const data = response.data;
                setNotes(Array.isArray(data) ? data : data.results || []);
            } catch (err) {
                console.error("Failed to load notes:", err.response || err);
                setError(
                    err.response?.status === 403
                        ? "Access denied. Please check your account permissions."
                        : err.response?.status === 401
                        ? "Your session has expired. Please log in again."
                        : "Unable to load notes. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
        <div style={{ padding: "24px" }}>
            <h1>Lecture Notes</h1>
            <p>View and download your learning materials.</p>

            {loading && <p>Loading notes...</p>}

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            {!loading && !error && notes.length === 0 && (
                <p>No lecture notes are available yet.</p>
            )}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    marginTop: "24px",
                }}
            >
                {notes.map((note) => (
                    <div
                        key={note.id}
                        style={{
                            padding: "20px",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            background: "#fff",
                        }}
                    >
                        <h3>{note.title}</h3>

                        {note.course && (
                            <p>
                                <strong>Course:</strong>{" "}
                                {typeof note.course === "object"
                                    ? note.course.name || note.course.code || note.course.id
                                    : note.course}
                            </p>
                        )}

                        {note.file && (
                            <a
                                href={note.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                View / Download Notes
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
