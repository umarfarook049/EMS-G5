import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import EmployeeDashborad from "./pages/EmployeeDashborad";
import AdminDashborad from "./pages/AdminDashborad";
import AdminNav from "./components/Nav";
import Employeedetails from "./pages/Employeedetails";
import EditEmployee from "./pages/EditEmployee";
import AddEmployee from "./pages/AddEmployee";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="dashboard" element={<AdminNav />}>
          <Route path="employee" element={<EmployeeDashborad />} />
          <Route path="admin" element={<AdminDashborad />} />
          <Route path="view/:id" element={<Employeedetails />} />
          <Route path="edit/:id" element={<EditEmployee />} />
          <Route path="newemployee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
