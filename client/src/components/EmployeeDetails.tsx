import React from "react";

import { Employee } from "@/lib/types";
import { useRecoilValue } from "recoil";
import { userInfo } from "@/store/atom";

interface EmployeeDetailProps {
  employee: Employee | undefined;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({
  employee,
}: EmployeeDetailProps) => {
  const user = useRecoilValue(userInfo);
  return (
    <>
      {employee ? (
        <div className="container mx-auto p-6 bg-white shadow-md rounded-md">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Employee Details
          </h1>
          {user?.IsAdmin && (
            <div className="mb-6">
              <button className="text-blue-600 hover:underline">
                &larr; Back to List
              </button>
            </div>
          )}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-100">
              <div className="border p-6 rounded-lg bg-white shadow-md ">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Personal Information
                </h2>
                <p>
                  <strong>Full Name:</strong> {employee.full_name}
                </p>
                <p>
                  <strong>Gender:</strong> {employee.gender}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(employee.date_of_birth).toLocaleDateString()}
                </p>
                <p>
                  <strong>Age:</strong> {employee.age}
                </p>
                <p>
                  <strong>Current Address:</strong> {employee.current_address}
                </p>
                <p>
                  <strong>Permanent Address:</strong>{" "}
                  {employee.permanent_address}
                </p>
                <p>
                  <strong>Mobile:</strong> {employee.mobile}
                </p>
                <p>
                  <strong>Personal Email:</strong> {employee.personal_mail}
                </p>
                <p>
                  <strong>Emergency Contact Name:</strong>{" "}
                  {employee.emergency_contact_name}
                </p>
                <p>
                  <strong>Emergency Contact Mobile:</strong>{" "}
                  {employee.emergency_contact_mobile}
                </p>
              </div>
              <div className="border p-6 rounded-lg bg-white shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Company Information
                </h2>
                <p>
                  <strong>Employee Code:</strong> {employee.employee_code}
                </p>
                <p>
                  <strong>Company Email:</strong> {employee.company_mail}
                </p>
                <p>
                  <strong>Office Phone:</strong> {employee.office_phone}
                </p>
                <p>
                  <strong>City:</strong> {employee.city}
                </p>
                <p>
                  <strong>Office Address:</strong> {employee.office_address}
                </p>
                <p>
                  <strong>Professional Reporting Manager:</strong>{" "}
                  {employee.professional_reporting_manager}
                </p>
                <p>
                  <strong>HR Name:</strong> {employee.hr_name}
                </p>
                <p>
                  <strong>Employment History:</strong>{" "}
                  {employee.employment_history}
                </p>
                <p>
                  <strong>Date of Joining:</strong>{" "}
                  {new Date(employee.date_of_joining).toLocaleDateString()}
                </p>
              </div>
              <div className="border p-6 rounded-lg bg-white shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Project Information
                </h2>
                <p>
                  <strong>Project Code:</strong> {employee.project_code}
                </p>
                <p>
                  <strong>Project Start Date:</strong>{" "}
                  {new Date(employee.project_start_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Project End Date:</strong>{" "}
                  {employee.project_end_date
                    ? new Date(employee.project_end_date).toLocaleDateString()
                    : "Ongoing"}
                </p>
                <p>
                  <strong>Client Name:</strong> {employee.client_name}
                </p>
                <p>
                  <strong>Project Reporting Manager:</strong>{" "}
                  {employee.project_reporting_manager}
                </p>
              </div>
              <div className="border p-6 rounded-lg bg-white shadow-md">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Additional Information
                </h2>
                <p>
                  <strong>PAN Card:</strong> {employee.pancard}
                </p>
                <p>
                  <strong>Aadhar Card:</strong> {employee.aadharcard}
                </p>
                <p>
                  <strong>Bank Name:</strong> {employee.bank_name}
                </p>
                <p>
                  <strong>Branch:</strong> {employee.branch}
                </p>
                <p>
                  <strong>IFSC Code:</strong> {employee.ifsc_code}
                </p>
                <p>
                  <strong>CTC Breakup:</strong> {employee.ctc_breakup}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EmployeeDetail;
