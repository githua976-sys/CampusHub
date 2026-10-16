
import { useState } from "react";
import api from "../api/axios";

export default function UserManagement() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        role: "Student",
        phone: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {
            await api.post("/users/create/", form);

            setMessage(
                `${form.role} account created successfully!`
            );

            setForm({
                first_name: "",
                last_name: "",
                username: "",
                email: "",
                password: "",
                role: "Student",
                phone: "",
            });
        } catch (err) {
            const data = err.response?.data;

            if (data && typeof data === "object") {
                const details = Object.entries(data)
                    .map(([field, value]) => {
                        const text = Array.isArray(value)
                            ? value.join(", ")
                            : typeof value === "string"
                                ? value
                                : JSON.stringify(value);

                        return `${field}: ${text}`;
                    })
                    .join(" | ");

                setError(
                    details || "Unable to create the account."
                );
            } else {
                setError(
                    "Could not connect to the server. Make sure Django is running."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.heading}>User Management</h1>
                    <p style={styles.subtitle}>
                        Create accounts for CampusHub users.
                    </p>
                </div>
            </div>

            <div style={styles.card}>
                <h2 style={styles.cardTitle}>Create New Account</h2>

                {message && (
                    <div style={styles.success}>
                        {message}
                    </div>
                )}

                {error && (
                    <div style={styles.error}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={styles.grid}>
                        <div style={styles.field}>
                            <label style={styles.label}>
                                First Name
                            </label>
                            <input
                                style={styles.input}
                                type="text"
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                required
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                Last Name
                            </label>
                            <input
                                style={styles.input}
                                type="text"
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                required
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                Username
                            </label>
                            <input
                                style={styles.input}
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                autoComplete="username"
                                required
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                Email Address
                            </label>
                            <input
                                style={styles.input}
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                required
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                Password
                            </label>
                            <input
                                style={styles.input}
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                autoComplete="new-password"
                                minLength={8}
                                required
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                Phone Number (optional)
                            </label>
                            <input
                                style={styles.input}
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>
                                User Role
                            </label>
                            <select
                                style={styles.input}
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="Student">
                                    Student
                                </option>
                                <option value="Lecturer">
                                    Lecturer
                                </option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    page: {
        padding: "32px",
        minHeight: "100vh",
        background: "#f4f7fb",
        boxSizing: "border-box",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "28px",
    },
    heading: {
        color: "#172554",
        fontSize: "28px",
        margin: "0 0 8px",
    },
    subtitle: {
        color: "#64748b",
        margin: 0,
    },
    card: {
        background: "#ffffff",
        padding: "28px",
        borderRadius: "14px",
        boxShadow: "0 4px 20px rgba(15, 23, 42, 0.06)",
        maxWidth: "900px",
    },
    cardTitle: {
        color: "#1e293b",
        marginTop: 0,
        marginBottom: "24px",
        fontSize: "21px",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: "20px",
    },
    field: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    label: {
        color: "#334155",
        fontSize: "14px",
        fontWeight: 600,
    },
    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 14px",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        fontSize: "14px",
        outline: "none",
        background: "#fff",
    },
    button: {
        marginTop: "26px",
        padding: "13px 22px",
        background: "#1d4ed8",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
    },
    success: {
        background: "#dcfce7",
        color: "#166534",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "18px",
    },
    error: {
        background: "#fee2e2",
        color: "#991b1b",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "18px",
        overflowWrap: "anywhere",
    },
};
