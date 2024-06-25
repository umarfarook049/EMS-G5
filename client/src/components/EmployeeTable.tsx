import React from "react";
import { Employee } from "@/lib/types";

type EmployeeTableProps = {
  data?: Employee[];
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  data,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">Employment Code</th>
          <th className="py-2 px-4 border-b">Name</th>
          <th className="py-2 px-4 border-b">Company Email</th>
          <th className="py-2 px-4 border-b">Manager Name</th>
          <th className="py-2 px-4 border-b">Current Project</th>
          <th className="py-2 px-4 border-b">Actions</th>
          <th className="py-2 px-4 border-b">Active</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((employee) => (
          <tr key={employee.user_id} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">{employee.employee_code}</td>
            <td className="py-2 px-4 border-b">{employee.full_name}</td>
            <td className="py-2 px-4 border-b">
              {employee.company_mail || "N/A"}
            </td>
            <td className="py-2 px-4 border-b">
              {employee.professional_reporting_manager || "N/A"}
            </td>
            <td className="py-2 px-4 border-b">
              {employee.project_code || "N/A"}
            </td>
            <td className="py-2 px-4 border-b space-x-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => onView(employee.user_id)}
              >
                View
              </button>
              <button
                className="text-yellow-600 hover:underline"
                onClick={() => onEdit(employee.user_id)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => onDelete(employee.user_id)}
              >
                Delete
              </button>
            </td>
            <td className="py-2 px-4 border-b space-x-2">
              <input type="checkbox" name="active" id="active" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
