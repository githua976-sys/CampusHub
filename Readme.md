# CampusHub Backend API

A Django REST Framework backend for **CampusHub**, a university management system that provides APIs for managing departments, courses, students, lecturers, enrollments, attendance, grades, and notes.

---

## Features

- User Authentication (JWT)
- Department Management
- Course Management
- Student Management
- Lecturer Management
- Enrollment Management
- Attendance Management
- Notes Management
- Grade Management
- RESTful API
- PostgreSQL Database
- Django Admin

---

## Technologies Used

- Python 3
- Django
- Django REST Framework
- PostgreSQL
- Simple JWT
- Postman
- Git & GitHub

---

## Project Structure

```
CampusHub/
│
├── accounts/
├── attendance/
├── courses/
├── departments/
├── enrollments/
├── grades/
├── lecturers/
├── notes/
├── students/
├── backend/
├── manage.py
├── requirements.txt
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/CampusHub.git
```

### Navigate into the project

```bash
cd CampusHub
```

### Create a virtual environment

```bash
python -m venv venv
```

### Activate the virtual environment

Windows

```bash
venv\Scripts\activate
```

Linux/Mac

```bash
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

---

## Configure Database

Update the PostgreSQL settings inside `settings.py`.

Example:

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": "campushub_db",
        "USER": "postgres",
        "PASSWORD": "your_password",
        "HOST": "localhost",
        "PORT": "5432",
    }
}
```

---

## Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## Create Superuser

```bash
python manage.py createsuperuser
```

---

## Run the Server

```bash
python manage.py runserver
```

Server URL

```
http://127.0.0.1:8000/
```

---

# API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | `/api/token/` |
| POST | `/api/token/refresh/` |

---

## Departments

| Method | Endpoint |
|---------|----------|
| GET | `/api/departments/` |
| POST | `/api/departments/` |
| GET | `/api/departments/{id}/` |
| PUT | `/api/departments/{id}/` |
| DELETE | `/api/departments/{id}/` |

---

## Courses

| Method | Endpoint |
|---------|----------|
| GET | `/api/courses/` |
| POST | `/api/courses/` |
| GET | `/api/courses/{id}/` |
| PUT | `/api/courses/{id}/` |
| DELETE | `/api/courses/{id}/` |

---

## Students

| Method | Endpoint |
|---------|----------|
| GET | `/api/students/` |
| POST | `/api/students/` |
| GET | `/api/students/{id}/` |
| PUT | `/api/students/{id}/` |
| DELETE | `/api/students/{id}/` |

---

## Lecturers

| Method | Endpoint |
|---------|----------|
| GET | `/api/lecturers/` |
| POST | `/api/lecturers/` |
| GET | `/api/lecturers/{id}/` |
| PUT | `/api/lecturers/{id}/` |
| DELETE | `/api/lecturers/{id}/` |

---

## Enrollments

| Method | Endpoint |
|---------|----------|
| GET | `/api/enrollments/` |
| POST | `/api/enrollments/` |
| GET | `/api/enrollments/{id}/` |
| PUT | `/api/enrollments/{id}/` |
| DELETE | `/api/enrollments/{id}/` |

---

## Attendance

| Method | Endpoint |
|---------|----------|
| GET | `/api/attendance/` |
| POST | `/api/attendance/` |
| GET | `/api/attendance/{id}/` |
| PUT | `/api/attendance/{id}/` |
| DELETE | `/api/attendance/{id}/` |

---

## Notes

| Method | Endpoint |
|---------|----------|
| GET | `/api/notes/` |
| POST | `/api/notes/` |
| GET | `/api/notes/{id}/` |
| PUT | `/api/notes/{id}/` |
| DELETE | `/api/notes/{id}/` |

---

## Grades

| Method | Endpoint |
|---------|----------|
| GET | `/api/grades/` |
| POST | `/api/grades/` |
| GET | `/api/grades/{id}/` |
| PUT | `/api/grades/{id}/` |
| DELETE | `/api/grades/{id}/` |

---

## Authentication

This project uses **JWT Authentication**.

Obtain an access token:

```http
POST /api/token/
```

Example request:

```json
{
    "username": "admin",
    "password": "your_password"
}
```

Use the access token in requests:

```
Authorization: Bearer <access_token>
```

---

## Testing

The API was tested using **Postman**.

Each module contains CRUD endpoints for:

- Departments
- Courses
- Students
- Lecturers
- Enrollments
- Attendance
- Notes
- Grades

---

## Future Improvements

- Role-Based Access Control (RBAC)
- Email Notifications
- File Uploads for Notes
- API Documentation using Swagger
- Deployment to Render or Railway
- Docker Support

---

## Author

**Amos**

Backend Developer

GitHub: https://github.com/githua976-sys/CampusHub.git

---

## License

This project is for educational purposes.