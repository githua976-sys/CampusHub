export default function Departments() {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>Departments Management</h1>
                    <p style={styles.subtitle}>
                        View and manage academic departments.
                    </p>
                </div>

                <div style={styles.badge}>
                    CampusHub
                </div>
            </div>

            <div style={styles.card}>
                <div style={styles.icon}>🏛️</div>
                <h2 style={styles.cardTitle}>Academic Departments</h2>
                <p style={styles.description}>
                    Manage your institution's departments and organize
                    academic programs in one place.
                </p>

                <div style={styles.notice}>
                    Department management features can be connected to
                    your Django REST API here.
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
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
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
    card: {
        background: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.04)",
        maxWidth: "700px",
    },
    icon: {
        fontSize: "36px",
        marginBottom: "16px",
    },
    cardTitle: {
        color: "#1e293b",
        margin: "0 0 12px",
        fontSize: "21px",
    },
    description: {
        color: "#64748b",
        lineHeight: 1.7,
        margin: "0 0 20px",
    },
    notice: {
        background: "#eff6ff",
        color: "#1e40af",
        padding: "16px",
        borderRadius: "8px",
        lineHeight: 1.6,
        fontSize: "14px",
    },
};