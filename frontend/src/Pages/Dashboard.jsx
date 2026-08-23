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

  useEffect(() => {
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
        console.error("Failed to load dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const cards = [
    {
      title: "Students",
      value: stats.students,
      link: "/students",
    },
    {
      title: "Lecturers",
      value: stats.lecturers,
      link: "/lecturers",
    },
    {
      title: "Departments",
      value: stats.departments,
      link: "/departments",
    },
    {
      title: "Courses",
      value: stats.courses,
      link: "/courses",
    },
    {
      title: "Enrollments",
      value: stats.enrollments,
      link: "/enrollments",
    },
    {
      title: "Payments",
      value: stats.payments,
      link: "/payments",
    },
  ];

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
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow p-6"
            >
              <h2 className="text-gray-500 text-sm">
                {card.title}
              </h2>

              <p className="text-3xl font-bold mt-2">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;