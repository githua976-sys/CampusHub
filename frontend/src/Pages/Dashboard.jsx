import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

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

  // Student payment states
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (user?.role !== "Admin") {
      setLoading(false);
      return;
    }

    const loadStats = async () => {
      try {
        const [
          students,
          lecturers,
          departments,
          courses,
          enrollments,
          payments,
        ] = await Promise.all([
          api.get("students/"),
          api.get("lecturers/"),
          api.get("departments/"),
          api.get("courses/"),
          api.get("enrollments/"),
          api.get("payments/"),
        ]);

        setStats({
          students: students.data.length,
          lecturers: lecturers.data.length,
          departments: departments.data.length,
          courses: courses.data.length,
          enrollments: enrollments.data.length,
          payments: payments.data.length,
        });
      } catch (error) {
        console.error(
          "Failed to load dashboard statistics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

  const handlePayment = async (e) => {
    e.preventDefault();

    setPaymentMessage("");
    setPaymentError("");

    if (!amount || !phoneNumber) {
      setPaymentError(
        "Please enter the amount and M-Pesa phone number."
      );
      return;
    }

    setPaymentLoading(true);

    try {
      const response = await api.post(
        "payments/initiate/",
        {
          amount: amount,
          phone_number: phoneNumber,
        }
      );

      setPaymentMessage(
        response.data.message ||
          "STK Push initiated. Check your phone."
      );

      setAmount("");
      setPhoneNumber("");

    } catch (error) {
      console.error(error);

      setPaymentError(
        error.response?.data?.error ||
          "Payment could not be initiated."
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // =========================
  // STUDENT DASHBOARD
  // =========================

  if (user?.role === "Student") {
    return (
      <div className="p-6">

        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Welcome, {user?.username}
          </h1>

          <p className="text-gray-500 mt-2">
            Student Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Payment Card */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-2">
              Make M-Pesa Payment
            </h2>

            <p className="text-gray-500 mb-6">
              Pay your school fees using M-Pesa.
            </p>

            {paymentMessage && (
              <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                {paymentMessage}
              </div>
            )}

            {paymentError && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                {paymentError}
              </div>
            )}

            <form onSubmit={handlePayment}>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  Amount
                </label>

                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) =>
                    setAmount(e.target.value)
                  }
                  placeholder="Enter amount"
                  className="w-full border p-3 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">
                  M-Pesa Phone Number
                </label>

                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) =>
                    setPhoneNumber(e.target.value)
                  }
                  placeholder="2547XXXXXXXX"
                  className="w-full border p-3 rounded"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={paymentLoading}
                className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {paymentLoading
                  ? "Processing..."
                  : "Pay with M-Pesa"}
              </button>

            </form>

          </div>

          {/* Student Information */}

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-semibold mb-4">
              My Account
            </h2>

            <div className="space-y-3">

              <p>
                <strong>Username:</strong>{" "}
                {user?.username}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {user?.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {user?.role}
              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================
  // ADMIN DASHBOARD
  // =========================

  return (
    <div className="p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username}
        </h1>

        <p className="text-gray-500 mt-2">
          Role: {user?.role}
        </p>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <DashboardCard
            title="Students"
            value={stats.students}
          />

          <DashboardCard
            title="Lecturers"
            value={stats.lecturers}
          />

          <DashboardCard
            title="Departments"
            value={stats.departments}
          />

          <DashboardCard
            title="Courses"
            value={stats.courses}
          />

          <DashboardCard
            title="Enrollments"
            value={stats.enrollments}
          />

          <DashboardCard
            title="Payments"
            value={stats.payments}
          />

        </div>
      )}

    </div>
  );
};


const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-gray-500 text-sm">
        {title}
      </h2>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
};


export default Dashboard;