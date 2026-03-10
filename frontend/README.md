# HRMS Lite – Full Stack Assignment

A simple Human Resource Management System (HRMS) built using FastAPI (Backend) and React (Frontend).

This project allows managing employees and tracking their attendance.

---

## 🚀 Live Demo

Frontend: <https://hrms-rho-eight.vercel.app/>  
Backend API: <https://hrms-438i.onrender.com/>

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- FastAPI
- MongoDB (Motor – async driver)
- Pydantic

---

## 📦 Features

### 👤 Employee Management
- Create employee (unique employee ID)
- Prevent duplicate employee creation
- View all employees
- Delete employee

### 📅 Attendance Management
- Mark attendance (Present / Absent)
- Prevent duplicate attendance for same date
- View attendance per employee
- Disable future date selection
- Sorted attendance (latest first)

### 🔔 UI & UX
- Global success and error toasts
- Loading states
- Empty states
- Responsive table layout
- Clean modal-based interaction

---

## 📁 Project Structure

hrms/
│
├── backend/
│ ├── routes/
│ ├── services/
│ ├── models.py
│ ├── database.py
│ └── main.py
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── hooks/
│ │ ├── api/
│ │ └── pages/
│ └── vite.config.js


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

git clone <https://github.com/Shubhampiet/HRMS.git>
cd hrms


---

## 🖥 Backend Setup

### Install Dependencies

cd backend
pip install -r requirements.txt


### Run Server

uvicorn main:app --reload


---

## 💻 Frontend Setup

### Install Dependencies

cd frontend
npm install


### Run Development Server
npm run dev

---

## 📌 API Endpoints

### Employee

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /employees | Create employee |
| GET | /employees | Get all employees |
| DELETE | /employees/{employee_id} | Delete employee |

---

### Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /attendance | Mark attendance |
| GET | /attendance/{employee_id} | Get attendance for employee |

---

## 📊 Data Validation

- Employee ID must be unique
- Email validated via Pydantic
- Attendance cannot be duplicated for same date
- Future dates are not allowed

---

## 🧠 Design Decisions

- Service layer used to separate business logic
- Global toast handling using custom `useApi` hook
- MongoDB upsert used to prevent duplicate attendance
- Clean and reusable component structure

---

## 📈 Future Improvements

- Pagination
- Date range filter for attendance
- Authentication
- Role-based access control

---

## 👨‍💻 Author

Shubham Singh
