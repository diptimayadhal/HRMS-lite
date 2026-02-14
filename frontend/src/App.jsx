import { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceList from "./components/AttendanceList";
import Dashboard from "./components/Dashboard";

function App() {
  const [refresh, setRefresh] = useState(false);

  const refreshData = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="container mt-5">

      <h2 className="text-center fw-bold mb-4">HRMS Lite</h2>

      <Dashboard refresh={refresh} />

      {/* Top Row */}
      <div className="row g-4 align-items-stretch mb-4">
        <div className="col-12 col-lg-6 d-flex">
          <EmployeeForm onSuccess={refreshData} />
        </div>

        <div className="col-12 col-lg-6 d-flex">
          <AttendanceForm onSuccess={refreshData} refresh={refresh} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <EmployeeList refresh={refresh} onSuccess={refreshData} />
        </div>

        <div className="col-12 col-lg-6">
          <AttendanceList refresh={refresh} />
        </div>
      </div>

    </div>
  );
}

export default App;
