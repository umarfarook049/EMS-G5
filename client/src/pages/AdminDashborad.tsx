import { Employee } from "@/lib/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { EmployeeTable } from "@/components/EmployeeTable";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [data, setData] = useState<Employee[]>();
  const [employeesCount, setEmployeesCount] = useState<number>();
  const [showProfilePic, setShowProfilePic] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState<string>();
  useEffect(() => {
    async function getdata() {
      try {
        const response = await axios.get<Employee[]>(
          "http://localhost:3000/api/v1/employees"
        );
        const responseData = await response.data;
        setData(responseData);
      } catch (error) {
        console.log("error", error);
        setError("something went wrong");
      }
    }
    if (!data) getdata();
  }, [data]);

  useMemo(() => {
    if (data) {
      setEmployeesCount(data.length);
    }
  }, [data]);

  const handleView = (id: number) => {
    navigate("/dashboard/view/" + id);
  };

  const handleEdit = (id: number) => {
    navigate("/dashboard/edit/" + id);
  };

  const handleDelete = (id: number) => {
    alert(`Delete employee with ID: ${id}`);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10 space-y-10">
        <div className="flex justify-between items-center mb-10">
          <div className="text-2xl font-bold">Dashboard</div>
          <div className="relative">
            <button
              className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onMouseEnter={() => setShowProfilePic(true)}
              onMouseLeave={() => setShowProfilePic(false)}
            >
              Profile
            </button>
            {showProfilePic && (
              <div className="absolute top-12 right-0 bg-white p-2 rounded shadow-lg">
                <img
                  src="data:image/png;base64,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" // replace with your actual profile image URL
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold">Employees</h3>
            <p className="text-amber-600 text-4xl">{employeesCount}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold">Projects</h3>
            <p className="text-green-600 text-4xl">0</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold mb-4">Employee Records</h3>
          {error ? (
            <h1>Something went wrong</h1>
          ) : (
            <EmployeeTable
              data={data}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
