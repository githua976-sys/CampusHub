export default function Courses() {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Courses Management</h1>
                    <p style={styles.subtitle}>
                        Manage academic courses and course information.
                    </p>
                </div>

                <div style={styles.badge}>🎓 CampusHub</div>
            </div>

            <div style={styles.statsGrid}>
                <div style={styles.card}>
                    <div style={styles.icon}>📚</div>
                    <p style={styles.label}>Total Courses</p>
                    <h2 style={styles.value}>—</h2>
                </div>

                <div style={styles.card}>
                    <div style={styles.icon}>🏛️</div>
                    <p style={styles.label}>Departments</p>
                    <h2 style={styles.value}>—</h2>
                </div>

                <div style={styles.card}>
                    <div style={styles.icon}>👨‍🏫</div>
                    <p style={styles.label}>Assigned Lecturers</p>
                    <h2 style={styles.value}>—</h2>
                </div>
            </div>

            <div style={styles.tableCard}>
                <h2 style={styles.sectionTitle}>Course Directory</h2>
                <p style={styles.description}>
                    View and organize courses offered by your institution.
                </p>

                <div style={{ overflowX: "auto" }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Course Code</th>
                                <th style={styles.th}>Course Name</th>
                                <th style={styles.th}>Department</th>
                                <th style={styles.th}>Lecturer</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4" style={styles.empty}>
                                    No course records loaded yet.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        padding: "32px",
        boxSizing: "border-box",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        marginBottom: "30px",
    },
    title: {
        margin: "0 0 8px",
        fontSize: "28px",
        color: "#1e293b",
    },
    subtitle: {
        margin: 0,
        color: "#64748b",
        fontSize: "15px",
    },
    badge: {
        padding: "10px 16px",
        borderRadius: "8px",
        background: "#dbeafe",
        color: "#1d4ed8",
        fontWeight: "bold",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: "20px",
        marginBottom: "28px",
    },
    card: {
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
    },
    icon: {
        fontSize: "28px",
        marginBottom: "12px",
    },
    label: {
        margin: "0 0 10px",
        color: "#64748b",
        fontSize: "14px",
    },
    value: {
        margin: 0,
        fontSize: "27px",
        color: "#1e293b",
    },
    tableCard: {
        padding: "26px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
    },
    sectionTitle: {
        margin: "0 0 10px",
        fontSize: "21px",
        color: "#1e293b",
    },
    description: {
        marginBottom: "22px",
        color: "#64748b",
        fontSize: "14px",
        lineHeight: 1.6,
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
    },
    th: {
        padding: "14px 12px",
        background: "#f1f5f9",
        color: "#475569",
        fontSize: "13px",
        borderBottom: "1px solid #e2e8f0",
        whiteSpace: "nowrap",
    },
    empty: {
        padding: "32px 12px",
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "14px",
    },
};