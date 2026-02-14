# HRMS Lite

HRMS Lite is a lightweight Human Resource Management System designed to manage employee records and track daily attendance.

This project demonstrates end-to-end full-stack development capability including REST API design, database modeling, frontend integration, validation handling, and deployment readiness.

---

## 🔗 Live Application

Frontend URL: To be updated after deployment

Backend API (Swagger Docs): To be updated after deployment

---

## 📌 Features

### 👨‍💼 Employee Management
- Add new employees
- View employee list
- Delete employees
- Unique Employee ID validation
- Email format validation
- Duplicate prevention

### 📅 Attendance Management
- Mark attendance (Present / Absent)
- View attendance records per employee
- Filter attendance by date
- Prevent invalid submissions

### 📊 Dashboard
- Displays today's attendance summary
- Total Employees
- Present Today
- Absent Today
- Real-time updates without page refresh

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Bootstrap
- Axios

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## 🚀 How to Run Locally

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt

##Create a .env file inside the backend folder:

DATABASE_URL=postgresql://username:password@localhost:5432/hrms_db

##Run backend:

uvicorn app.main:app --reload

#Backend will run at:
http://127.0.0.1:8000

#Swagger documentation:
http://127.0.0.1:8000/docs

##Frontend Setup
cd frontend
npm install
npm run dev

#Frontend runs at:

http://localhost:5173


❗ Assumptions & Scope

Single admin user (no authentication required)

Attendance summary is calculated for the current date

Payroll and advanced HR features are intentionally out of scope

Focus is on clean architecture, stability, and production readiness

✅ Error Handling Implemented

Required field validation

Email format validation

Duplicate employee handling

Graceful error responses

Proper HTTP status codes

Meaningful UI error messages

Loading and empty states

⏱ Estimated Development Time

Approximately 6–8 hours as per assignment expectation.

👩‍💻 Author

Diptimaya Dhal