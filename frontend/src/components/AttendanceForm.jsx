import { useEffect, useState } from "react";
import API from "../services/api";

function AttendanceForm({ onSuccess, refresh }) {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]); // 🔥 auto refresh dropdown

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/attendance/", form);
      setForm({ employee_id: "", date: "", status: "Present" });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to mark attendance");
    }

    setLoading(false);
  };

  return (
    <div className="card shadow-sm p-4 w-100 h-100">
      <h5 className="mb-3">Mark Attendance</h5>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="d-flex flex-column h-100">

        <select
          className="form-control mb-2"
          name="employee_id"
          value={form.employee_id}
          onChange={handleChange}
          required
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
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <select
          className="form-control mb-3"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button className="btn btn-success mt-auto w-100" disabled={loading}>
          {loading ? "Saving..." : "Mark Attendance"}
        </button>
      </form>
    </div>
  );
}

export default AttendanceForm;
