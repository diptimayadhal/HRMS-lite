import { useEffect, useState } from "react";
import API from "../services/api";

function EmployeeList({ refresh, onSuccess }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.get("/employees/");
      setEmployees(res.data);
    } catch {
      setError("Failed to fetch employees");
    }

    setLoading(false);
  };

  const deleteEmployee = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
      onSuccess(); // 🔥 trigger global refresh
    } catch {
      console.log("Delete failed");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <div className="card shadow-sm p-4 h-100">
      <h5 className="mb-3">Employee List</h5>

      <div className="table-responsive">
        <table
          className="table table-striped align-middle"
          style={{ tableLayout: "fixed" }}
        >
          <thead className="table-light">
            <tr>
              <th style={{ width: "15%" }}>ID</th>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "35%" }}>Email</th>
              <th style={{ width: "15%" }}>Department</th>
              <th style={{ width: "10%" }}></th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.employee_id}</td>
                <td>{emp.full_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEmployee(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;
