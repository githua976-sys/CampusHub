export default function Grades() {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Grades Management</h1>
                    <p style={styles.subtitle}>
                        View and manage student academic results.
                    </p>
                </div>

                <div style={styles.badge}>CampusHub</div>
            </div>

            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statIcon}>🎓</div>
                    <p style={styles.statLabel}>Total Grades</p>
                    <h2 style={styles.statValue}>—</h2>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon}>📊</div>
                    <p style={styles.statLabel}>Average Score</p>
                    <h2 style={styles.statValue}>—</h2>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon}>📚</div>
                    <p style={styles.statLabel}>Courses Graded</p>
                    <h2 style={styles.statValue}>—</h2>
                </div>
            </div>

            <div style={styles.card}>
                <h2 style={styles.cardTitle}>Student Grades</h2>
                <p style={styles.description}>
                    Academic performance and examination results will
                    appear here when connected to the backend.
                </p>

                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Student</th>
                                <th style={styles.th}>Course</th>
                                <th style={styles.th}>Score</th>
                                <th style={styles.th}>Grade</th>
                                <th style={styles.th}>Semester</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td colSpan="5" style={styles.emptyState}>
                                    No grade records loaded yet.
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
        padding: "32px",
        background: "#f8fafc",
        minHeight: "100vh",
        boxSizing: "border-box",
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
        color: "#1e293b",
        fontSize: "28px",
    },
    subtitle: {
        margin: 0,
        color: "#64748b",
        fontSize: "15px",
    },
    badge: {
        background: "#dbeafe",
        color: "#1d4ed8",
        padding: "10px 16px",
        borderRadius: "8px",
        fontWeight: "bold",
    },
    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "20px",
        marginBottom: "28px",
    },
    statCard: {
        background: "#ffffff",
        padding: "22px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
    },
    statIcon: {
        fontSize: "26px",
        marginBottom: "12px",
    },
    statLabel: {
        color: "#64748b",
        fontSize: "14px",
        margin: "0 0 10px",
    },
    statValue: {
        color: "#1e293b",
        fontSize: "27px",
        margin: 0,
    },
    card: {
        background: "#ffffff",
        padding: "26px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
    },
    cardTitle: {
        color: "#1e293b",
        fontSize: "21px",
        margin: "0 0 10px",
    },
    description: {
        color: "#64748b",
        fontSize: "14px",
        lineHeight: 1.6,
        marginBottom: "22px",
    },
    tableWrapper: {
        width: "100%",
        overflowX: "auto",
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
        fontWeight: "600",
        borderBottom: "1px solid #e2e8f0",
        whiteSpace: "nowrap",
    },
    emptyState: {
        padding: "32px 12px",
        textAlign: "center",
        color: "#94a3b8",
        fontSize: "14px",
    },
};