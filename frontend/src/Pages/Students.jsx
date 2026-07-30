import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [user, setUser] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [department, setDepartment] = useState("");

    const token = localStorage.getItem("access");

    // ==========================
    // Fetch Students
    // ==========================
    const fetchStudents = async () => {
        try {
            const response = await api.get("students/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStudents(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    // ==========================
    // Fetch Users
    // ==========================
    const fetchUsers = async () => {
        try {
            const response = await api.get("users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setUsers(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    // ==========================
    // Fetch Departments
    // ==========================
    const fetchDepartments = async () => {
        try {
            const response = await api.get("departments/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDepartments(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchUsers();
        fetchDepartments();
    }, []);

    // ==========================
    // Add Student
    // ==========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post(
                "students/",
                {
                    user,
                    registration_number: registrationNumber,
                    department,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Student Added Successfully");

            setUser("");
            setRegistrationNumber("");
            setDepartment("");

            fetchStudents();

        } catch (error) {
            console.error(error.response?.data);
            alert("Failed to add student");
        }
    };

    // ==========================
    // Delete Student
    // ==========================
    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`students/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Student Deleted");

            fetchStudents();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1>Students Management</h1>

            <hr />

            <form onSubmit={handleSubmit}>

                <h3>Add Student</h3>

                <select
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                >
                    <option value="">Select User</option>

                    {users.map((u) => (
                        <option
                            key={u.id}
                            value={u.id}
                        >
                            {u.username}
                        </option>
                    ))}

                </select>

                <br /><br />

                <input
                    type="text"
                    placeholder="Registration Number"
                    value={registrationNumber}
                    onChange={(e) =>
                        setRegistrationNumber(e.target.value)
                    }
                    required
                />

                <br /><br />

                <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                >
                    <option value="">
                        Select Department
                    </option>

                    {departments.map((dept) => (
                        <option
                            key={dept.id}
                            value={dept.id}
                        >
                            {dept.name}
                        </option>
                    ))}

                </select>

                <br /><br />

                <button type="submit">
                    Add Student
                </button>

            </form>

            <hr />

            <h2>Students List</h2>

            <table
                border="1"
                cellPadding="10"
                width="100%"
            >

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Registration Number</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {students.length === 0 ? (

                        <tr>
                            <td colSpan="5">
                                No students found.
                            </td>
                        </tr>

                    ) : (

                        students.map((student) => (

                            <tr key={student.id}>

                                <td>{student.id}</td>

                                <td>
                                    {student.username ?? student.user}
                                </td>

                                <td>
                                    {student.registration_number}
                                </td>

                                <td>
                                    {student.department_name ?? student.department}
                                </td>

                                <td>

                                    <button>
                                        Edit
                                    </button>

                                    {" "}

                                    <button
                                        onClick={() =>
                                            deleteStudent(student.id)
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

        </div>
    );
}