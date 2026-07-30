import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Students() {
    const [students, setStudents] = useState([]);

    const [user, setUser] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [department, setDepartment] = useState("");

    const token = localStorage.getItem("access");

    // ============================
    // GET STUDENTS
    // ============================
    const fetchStudents = async () => {
        try {
            const response = await api.get("students/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // ============================
    // ADD STUDENT
    // ============================
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

            setUser("");
            setRegistrationNumber("");
            setDepartment("");

            fetchStudents();

        } catch (error) {
            console.error(error.response?.data);
            alert("Failed to add student");
        }
    };

    // ============================
    // DELETE STUDENT
    // ============================
    const deleteStudent = async (id) => {

        if (!window.confirm("Delete this student?")) return;

        try {
            await api.delete(`students/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchStudents();

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>

            <h1>Students</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    placeholder="User ID"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />

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

                <input
                    type="number"
                    placeholder="Department ID"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />

                <br /><br />

                <button type="submit">
                    Add Student
                </button>

            </form>

            <hr />

            <table border="1" cellPadding="10" width="100%">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Registration Number</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {students.map((student) => (

                        <tr key={student.id}>

                            <td>{student.id}</td>

                            <td>{student.username ?? student.user}</td>

                            <td>{student.registration_number}</td>

                            <td>{student.department_name ?? student.department}</td>

                            <td>

                                <button>Edit</button>

                                <button
                                    onClick={() =>
                                        deleteStudent(student.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}