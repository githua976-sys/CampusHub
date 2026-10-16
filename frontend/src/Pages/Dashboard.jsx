
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    students: 0,
    lecturers: 0,
    departments: 0,
    courses: 0,
    enrollments: 0,
    payments: 0,
  });

  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState("");

  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentError, setPaymentError] = useState("");

  // Load dashboard statistics from Django REST API.
  useEffect(() => {
    if (!user || user.role !== "Admin") {
      setLoading(false);
      return;
    }

    let active = true;

    const endpoints = [
      { key: "students", url: "students/" },
      { key: "lecturers", url: "lecturers/" },
      { key: "departments", url: "departments/" },
      { key: "courses", url: "courses/" },
      { key: "enrollments", url: "enrollments/" },
      { key: "payments", url: "payments/" },
    ];

    const countItems = (data) => {
      if (Array.isArray(data)) {
        return data.length;
      }

      if (Array.isArray(data?.results)) {
        return data.count ?? data.results.length;
      }

      if (typeof data?.count === "number") {
        return data.count;
      }

      return 0;
    };

    const loadStats = async () => {
      setLoading(true);
      setStatsError("");

      try {
        const results = await Promise.all(
          endpoints.map(async ({ key, url }) => {
            try {
              const response = await api.get(url);

              return {
                key,
                value: countItems(response.data),
                failed: false,
              };
            } catch (error) {
              console.error(
                `Failed to load ${key}:`,
                error.response?.status,
                error.response?.data || error.message
              );

              return {
                key,
                value: null,
                failed: true,
              };
            }
          })
        );

        if (!active) return;

        const failedEndpoints = results
          .filter((result) => result.failed)
          .map((result) => result.key);

        setStats((previous) => {
          const updated = { ...previous };

          results.forEach(({ key, value }) => {
            // Preserve the previous value when an endpoint fails.
            if (value !== null) {
              updated[key] = value;
            }
          });

          return updated;
        });

        if (failedEndpoints.length > 0) {
          setStatsError(
            `Could not load: ${failedEndpoints.join(", ")}. Check the API URLs and permissions.`
          );
        }
      } catch (error) {
        console.error("Dashboard statistics error:", error);

        if (active) {
          setStatsError("Unable to load dashboard statistics.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      active = false;
    };
  }, [user?.role]);

  // Initiate an M-Pesa STK Push payment.
  const handlePayment = async (e) => {
    e.preventDefault();

    setPaymentMessage("");
    setPaymentError("");

    const normalizedPhone = phoneNumber.replace(/[\s+-]/g, "");

    const validPhone =
      /^(254|0)?7\d{8}$/.test(normalizedPhone) ||
      /^(254|0)?1\d{8}$/.test(normalizedPhone);

    if (
      !amount ||
      !Number.isFinite(Number(amount)) ||
      Number(amount) < 1
    ) {
      setPaymentError("Enter a valid payment amount of at least KSh 1.");
      return;
    }

    if (!validPhone) {
      setPaymentError(
        "Enter a valid Kenyan M-Pesa number, for example 0712345678 or 254712345678."
      );
      return;
    }

    const formattedPhone = normalizedPhone.startsWith("0")
      ? `254${normalizedPhone.slice(1)}`
      : normalizedPhone.startsWith("254")
        ? normalizedPhone
        : `254${normalizedPhone}`;

    setPaymentLoading(true);

    try {
      const response = await api.post("payments/initiate/", {
        amount,
        phone_number: formattedPhone,
      });

      setPaymentMessage(
        response.data?.message ||
          "Payment request submitted. Check your phone for the M-Pesa prompt."
      );

      setAmount("");
      setPhoneNumber("");
    } catch (error) {
      console.error(
        "Payment error:",
        error.response?.data || error.message
      );

      const data = error.response?.data;

      setPaymentError(
        data?.details ||
          data?.error ||
          data?.detail ||
          "We couldn't initiate your payment. Please check your details and try again."
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  const firstName =
    user?.first_name?.trim() || user?.username || "User";

  const statsCards = [
    {
      title: "Students",
      value: stats.students,
      icon: "♙",
      color: "blue",
    },
    {
      title: "Lecturers",
      value: stats.lecturers,
      icon: "♧",
      color: "purple",
    },
    {
      title: "Departments",
      value: stats.departments,
      icon: "▦",
      color: "green",
    },
    {
      title: "Courses",
      value: stats.courses,
      icon: "▤",
      color: "orange",
    },
    {
      title: "Enrollments",
      value: stats.enrollments,
      icon: "✓",
      color: "teal",
    },
    {
      title: "Payments",
      value: stats.payments,
      icon: "KSh",
      color: "pink",
    },
  ];

  return (
    <div className="ch-dashboard">
      <header className="ch-topbar">
        <div>
          <span className="ch-eyebrow">CAMPUSHUB PORTAL</span>
          <p className="ch-topbar-subtitle">
            University Management System
          </p>
        </div>

        <div className="ch-user-chip">
          <div className="ch-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div className="ch-user-details">
            <strong>{firstName}</strong>
            <span>{user?.role || "User"}</span>
          </div>
        </div>
      </header>

      <main className="ch-main">
        <section className="ch-welcome">
          <div>
            <span className="ch-eyebrow">
              {user?.role === "Admin"
                ? "ADMINISTRATION"
                : "STUDENT PORTAL"}
            </span>

            <h1>
              Welcome back, {firstName}
              <span className="ch-wave"> 👋</span>
            </h1>

            <p>
              {user?.role === "Student"
                ? "Manage your school fee payments and account details in one place."
                : "Here is an overview of your university management system."}
            </p>
          </div>

          <div className="ch-date-chip">
            <span className="ch-status-dot" />
            Portal active
          </div>
        </section>

        {user?.role === "Student" ? (
          <div className="ch-content-grid">
            <section className="ch-card ch-payment-card">
              <div className="ch-card-heading">
                <div className="ch-heading-icon green-icon">
                  KSh
                </div>

                <div>
                  <h2>School fee payment</h2>
                  <p>Pay securely using M-Pesa STK Push</p>
                </div>
              </div>

              <div className="ch-mpesa-banner">
                <div>
                  <span className="ch-mpesa-label">
                    PAYMENT METHOD
                  </span>
                  <h3>M-Pesa</h3>
                  <p>
                    Pay directly from your registered mobile wallet.
                  </p>
                </div>

                <div className="ch-mpesa-mark">M</div>
              </div>

              {paymentMessage && (
                <div
                  className="ch-alert ch-alert-success"
                  role="status"
                >
                  <span>✓</span>
                  <div>
                    <strong>Request submitted</strong>
                    <p>{paymentMessage}</p>
                  </div>
                </div>
              )}

              {paymentError && (
                <div
                  className="ch-alert ch-alert-error"
                  role="alert"
                >
                  <span>!</span>
                  <div>
                    <strong>Payment could not be started</strong>
                    <p>{paymentError}</p>
                  </div>
                </div>
              )}

              <form
                onSubmit={handlePayment}
                className="ch-payment-form"
              >
                <div className="ch-field">
                  <label htmlFor="payment-amount">
                    Amount (KES)
                  </label>

                  <div className="ch-input-wrap">
                    <span className="ch-input-prefix">KSh</span>

                    <input
                      id="payment-amount"
                      type="number"
                      min="1"
                      step="1"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      required
                      disabled={paymentLoading}
                    />
                  </div>
                </div>

                <div className="ch-field">
                  <label htmlFor="payment-phone">
                    M-Pesa phone number
                  </label>

                  <input
                    id="payment-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value)
                    }
                    placeholder="0712345678 or 254712345678"
                    required
                    disabled={paymentLoading}
                  />

                  <span className="ch-field-help">
                    Enter the Kenyan number that should receive the
                    payment prompt.
                  </span>
                </div>

                <button
                  className="ch-pay-button"
                  type="submit"
                  disabled={paymentLoading}
                >
                  {paymentLoading ? (
                    <>
                      <span className="ch-spinner" />
                      Sending request...
                    </>
                  ) : (
                    <>
                      Continue to M-Pesa <span>→</span>
                    </>
                  )}
                </button>

                <p className="ch-security-note">
                  <span>▣</span> Never share your M-Pesa PIN with
                  anyone.
                </p>
              </form>
            </section>

            <aside className="ch-side-column">
              <section className="ch-card ch-account-card">
                <div className="ch-card-heading">
                  <div className="ch-heading-icon blue-icon">
                    ♙
                  </div>

                  <div>
                    <h2>My account</h2>
                    <p>Your profile information</p>
                  </div>
                </div>

                <div className="ch-profile">
                  <div className="ch-profile-avatar">
                    {firstName.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {user?.first_name || user?.username}
                    </strong>
                    <span>{user?.role || "Student"}</span>
                  </div>
                </div>

                <div className="ch-info-row">
                  <span>Username</span>
                  <strong>{user?.username || "—"}</strong>
                </div>

                <div className="ch-info-row">
                  <span>Email address</span>
                  <strong className="ch-email-value">
                    {user?.email || "Not provided"}
                  </strong>
                </div>

                <div className="ch-info-row">
                  <span>Account role</span>
                  <strong>
                    <span className="ch-role-badge">
                      {user?.role || "Student"}
                    </span>
                  </strong>
                </div>
              </section>

              <section className="ch-help-card">
                <div className="ch-help-icon">i</div>

                <div>
                  <h3>Need assistance?</h3>
                  <p>
                    If a payment prompt does not arrive, check the
                    phone number and try again. Contact your
                    university administrator if the problem
                    continues.
                  </p>
                </div>
              </section>
            </aside>
          </div>
        ) : user?.role === "Admin" ? (
          <section>
            <div className="ch-section-title">
              <div>
                <h2>System overview</h2>
                <p>
                  Key records across your university portal
                </p>
              </div>

              <span className="ch-overview-badge">
                Live overview
              </span>
            </div>

            {statsError && (
              <div className="ch-alert ch-alert-error" role="alert">
                <span>!</span>
                <div>
                  <strong>Some statistics could not load</strong>
                  <p>{statsError}</p>
                </div>
              </div>
            )}

            {loading ? (
              <div className="ch-card ch-loading">
                <span className="ch-spinner ch-spinner-blue" />
                Loading dashboard statistics...
              </div>
            ) : (
              <div className="ch-stats-grid">
                {statsCards.map((card) => (
                  <div
                    className="ch-card ch-stat-card"
                    key={card.title}
                  >
                    <div
                      className={`ch-stat-icon ${card.color}`}
                    >
                      {card.icon}
                    </div>

                    <div>
                      <p>{card.title}</p>
                      <strong>
                        {card.value.toLocaleString()}
                      </strong>
                      <span>Recorded in the system</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              className="ch-pay-button"
              style={{ marginTop: "20px", maxWidth: "200px" }}
              disabled={loading}
              onClick={() => {
                setStatsError("");
                setLoading(true);

                const endpoints = [
                  ["students", "students/"],
                  ["lecturers", "lecturers/"],
                  ["departments", "departments/"],
                  ["courses", "courses/"],
                  ["enrollments", "enrollments/"],
                  ["payments", "payments/"],
                ];

                Promise.all(
                  endpoints.map(async ([key, url]) => {
                    try {
                      const response = await api.get(url);
                      const data = response.data;

                      const count = Array.isArray(data)
                        ? data.length
                        : data?.count ??
                          data?.results?.length ??
                          0;

                      return { key, count, failed: false };
                    } catch (error) {
                      console.error(
                        `Failed to refresh ${key}:`,
                        error.response?.data || error.message
                      );

                      return { key, count: null, failed: true };
                    }
                  })
                )
                  .then((results) => {
                    setStats((previous) => {
                      const updated = { ...previous };

                      results.forEach(({ key, count }) => {
                        if (count !== null) {
                          updated[key] = count;
                        }
                      });

                      return updated;
                    });

                    const failed = results
                      .filter((result) => result.failed)
                      .map((result) => result.key);

                    if (failed.length) {
                      setStatsError(
                        `Could not load: ${failed.join(", ")}. Check API URLs and permissions.`
                      );
                    }
                  })
                  .finally(() => setLoading(false));
              }}
            >
              Refresh statistics
            </button>
          </section>
        ) : (
          <section className="ch-card">
            <h2>Welcome to CampusHub</h2>
            <p>Your account role is {user?.role || "not assigned"}.</p>
          </section>
        )}

        <footer className="ch-footer">
          <span>CampusHub</span>
          <span>University Management System</span>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
