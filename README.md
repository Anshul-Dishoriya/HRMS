# HRMS Lite – Full Stack Assignment

A lightweight Human Resource Management System built with Django REST Framework (Backend) and React (Frontend).

Manages employees and tracks their daily attendance.

---

##  Live Demo

Frontend: 
Backend API: 

---

##  Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Hot Toast
- React Router DOM

### Backend
- Django + Django REST Framework
- PostgreSQL
- python-dotenv

---

##  Features

###  Employee Management
- Create employee (unique employee ID)
- Prevent duplicate employee creation
- View all employees
- Delete employee (cascades to attendance records)

###  Attendance Management
- Mark attendance (Present / Absent)
- Upsert logic — updates if same date already marked
- View attendance per employee with summary counts
- Date range filter on attendance history
- Disable future date selection
- Sorted attendance (latest first)

###  Analytics
- Daily attendance summary (total marked, present, absent)
- Employee-wise attendance breakdown for any date



##  Project Structure

```
HRMS/
├── backend/
│   ├── hrms/                  # Django project settings & root URL config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── employees/             # Employee CRUD app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── attendance/            # Attendance marking & retrieval app
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── admin.py
│   ├── analytics/             # Attendance summary & analytics app
│   │   ├── views.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── icons/         # Shared SVG icon components
│   │   │   ├── modals/        # All modal dialogs
│   │   │   └── ui/            # Reusable UI primitives
│   │   ├── pages/             # Page-level components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── api/               # Axios API layer
│   │   └── utils/             # Shared utility functions
│   └── vite.config.js
│
└── README.md
```

---

##  Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Anshul-Dishoriya/HRMS.git
cd HRMS
```

---

##  Backend Setup

### Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Configure Environment

Create a `.env` file in `backend/` with:

```env
SECRET_KEY=your-secret-key
DEBUG=True
PSQL_DB=hrms
PSQL_USER=postgres
PSQL_PASS=your-password
PSQL_HOST=127.0.0.1
PSQL_PORT=5432
```

### Run Migrations & Server

```bash
python manage.py migrate
python manage.py runserver
```

---

## Frontend Setup

### Install Dependencies

```bash
cd frontend
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## API Endpoints

### Employee

| Method | Endpoint                     | Description         |
|--------|------------------------------|---------------------|
| POST   | `/employees`                 | Create employee     |
| GET    | `/employees`                 | Get all employees   |
| DELETE | `/employees/{employee_id}`   | Delete employee     |

### Attendance

| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| POST   | `/attendance`                   | Mark / update attendance       |
| GET    | `/attendance/{employee_id}`     | Get attendance for employee    |

### Analytics

| Method | Endpoint                              | Description                         |
|--------|---------------------------------------|-------------------------------------|
| GET    | `/analytics/attendance-summary?date=` | Daily attendance summary by date    |

---

## Data Validation

- Employee ID must be unique
- Email validated via Django's `EmailField`
- Attendance uses upsert — same date updates instead of duplicating
- Future dates are blocked on the frontend

---

## Author

Anshul Dishoriya
