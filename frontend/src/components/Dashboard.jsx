import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard({ refresh }) {
  const [data, setData] = useState({
    date: "",
    total_employees: 0,
    present_today: 0,
    absent_today: 0
  });

  const fetchSummary = async () => {
    try {
      const res = await API.get("/employees/summary/dashboard");
      setData(res.data);
    } catch {
      console.log("Failed to fetch summary");
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [refresh]);

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h5 className="mb-3 text-center">
        Attendance Summary (Today: {data.date})
      </h5>

      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Total Employees</th>
              <th>Present Today</th>
              <th>Absent Today</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="fw-bold fs-5">{data.total_employees}</td>
              <td className="fw-bold fs-5 text-success">
                {data.present_today}
              </td>
              <td className="fw-bold fs-5 text-danger">
                {data.absent_today}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
