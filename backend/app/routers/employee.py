from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate, EmployeeResponse
from app.models.attendance import Attendance
from sqlalchemy import func
from datetime import date

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("/", response_model=EmployeeResponse, status_code=201)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):

    if db.query(Employee).filter(Employee.email == employee.email).first():
        raise HTTPException(status_code=400, detail="Email already exists.")

    if db.query(Employee).filter(Employee.employee_id == employee.employee_id).first():
        raise HTTPException(status_code=400, detail="Employee ID already exists.")

    new_employee = Employee(**employee.model_dump())
    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee

@router.get("/", response_model=list[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(Employee).all()

@router.delete("/{id}")
def delete_employee(id: int, db: Session = Depends(get_db)):
    employee = db.query(Employee).filter(Employee.id == id).first()

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # 🔥 Delete related attendance first
    db.query(Attendance).filter(Attendance.employee_id == id).delete()

    db.delete(employee)
    db.commit()

    return {"message": "Employee deleted successfully"}

@router.get("/summary/dashboard")
def dashboard_summary(db: Session = Depends(get_db)):

    today = date.today()

    total_employees = db.query(Employee).count()

    total_present_today = db.query(func.count(Attendance.id))\
        .filter(
            Attendance.status == "Present",
            Attendance.date == today
        )\
        .scalar()

    total_absent_today = db.query(func.count(Attendance.id))\
        .filter(
            Attendance.status == "Absent",
            Attendance.date == today
        )\
        .scalar()

    return {
        "date": today,
        "total_employees": total_employees,
        "present_today": total_present_today,
        "absent_today": total_absent_today
    }
