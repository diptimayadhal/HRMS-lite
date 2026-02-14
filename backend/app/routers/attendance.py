from fastapi import APIRouter, Depends, HTTPException, Query
from datetime import date

from sqlalchemy.orm import Session
from app.database import get_db
from app.models.attendance import Attendance
from app.models.employee import Employee
from app.schemas.attendance import AttendanceCreate, AttendanceResponse

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/", response_model=AttendanceResponse, status_code=201)
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db)):

    employee = db.query(Employee).filter(Employee.id == data.employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found.")

    attendance = Attendance(**data.model_dump())
    db.add(attendance)
    db.commit()
    db.refresh(attendance)

    return attendance

@router.get("/{employee_id}", response_model=list[AttendanceResponse])
def get_attendance(
    employee_id: int,
    filter_date: date | None = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    )

    if filter_date:
        query = query.filter(Attendance.date == filter_date)

    records = query.all()

    return records
