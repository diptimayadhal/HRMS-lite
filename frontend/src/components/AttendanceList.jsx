import { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceList({ refresh }) {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    const res = await API.get("/employees/");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const fetchAttendance = async () => {
    if (!selectedEmployee) return;

    setLoading(true);
    setError("");

    try {
      let url = `/attendance/${selectedEmployee}`;
      if (dateFilter) url += `?filter_date=${dateFilter}`;

      const res = await API.get(url);
      setRecords(res.data);
    } catch {
      setError("Failed to fetch attendance");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (selectedEmployee) fetchAttendance();
  }, [refresh]);

  return (
    <div className="card shadow-sm p-4 h-100">
      <h5 className="mb-3">View Attendance</h5>

      <select
        className="form-control mb-2"
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.full_name} (ID: {emp.employee_id})
          </option>
        ))}
      </select>

      <input
        type="date"
        className="form-control mb-2"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      <button className="btn btn-primary mb-3" onClick={fetchAttendance}>
        Fetch Attendance
      </button>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && records.length === 0 && selectedEmployee && (
        <p>No attendance records found.</p>
      )}

      {records.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.date}</td>
                  <td
                    className={
                      record.status === "Present"
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttendanceList;
