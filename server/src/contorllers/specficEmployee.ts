import { Request, Response } from "express";
import pool from "../models/db"; // Ensure to import your pool configuration

export async function getEmployeeById(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        u.user_id,
        u.employee_code,
        u.name AS user_name,
        u.email AS user_email,
        pd.full_name,
        pd.date_of_birth,
        pd.gender,
        pd.age,
        pd.current_address,
        pd.permanent_address,
        pd.mobile,
        pd.personal_mail,
        pd.emergency_contact_name,
        pd.emergency_contact_mobile,
        prof.company_mail,
        prof.office_phone,
        prof.city,
        prof.office_address,
        prof.reporting_manager AS professional_reporting_manager,
        prof.hr_name,
        prof.employment_history,
        prof.date_of_joining,
        pr.project_code,
        pr.start_date AS project_start_date,
        pr.end_date AS project_end_date,
        pr.client_name,
        pr.reporting_manager AS project_reporting_manager,
        fin.pancard,
        fin.aadharcard,
        fin.bank_name,
        fin.branch,
        fin.ifsc_code,
        fin.ctc_breakup
      FROM users u
      LEFT JOIN personal_details pd ON u.user_id = pd.user_id
      LEFT JOIN professional_details prof ON u.user_id = prof.user_id
      LEFT JOIN project_details pr ON u.user_id = pr.user_id
      LEFT JOIN finance_details fin ON u.user_id = fin.user_id
      WHERE u.user_id = $1;
    `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Employee not found");
    }

    const employee = result.rows[0];

    // Handling null values and assigning default values if necessary
    const user = {
      UserID: employee.user_id,
      EmployeeCode: employee.employee_code,
      UserName: employee.user_name || "N/A",
      UserEmail: employee.user_email || "N/A",
      FullName: employee.full_name || "N/A",
      DateOfBirth: employee.date_of_birth || "N/A",
      Gender: employee.gender || "N/A",
      Age: employee.age || "N/A",
      CurrentAddress: employee.current_address || "N/A",
      PermanentAddress: employee.permanent_address || "N/A",
      Mobile: employee.mobile || "N/A",
      PersonalMail: employee.personal_mail || "N/A",
      EmergencyContactName: employee.emergency_contact_name || "N/A",
      EmergencyContactMobile: employee.emergency_contact_mobile || "N/A",
      CompanyMail: employee.company_mail || "N/A",
      OfficePhone: employee.office_phone || "N/A",
      City: employee.city || "N/A",
      OfficeAddress: employee.office_address || "N/A",
      ProfessionalReportingManager:
        employee.professional_reporting_manager || "N/A",
      HRName: employee.hr_name || "N/A",
      EmploymentHistory: employee.employment_history || "N/A",
      DateOfJoining: employee.date_of_joining || "N/A",
      ProjectCode: employee.project_code || "N/A",
      ProjectStartDate: employee.project_start_date || "N/A",
      ProjectEndDate: employee.project_end_date || "N/A",
      ClientName: employee.client_name || "N/A",
      ProjectReportingManager: employee.project_reporting_manager || "N/A",
      Pancard: employee.pancard || "N/A",
      Aadharcard: employee.aadharcard || "N/A",
      BankName: employee.bank_name || "N/A",
      Branch: employee.branch || "N/A",
      IFSCCode: employee.ifsc_code || "N/A",
      CTCBreakup: employee.ctc_breakup || "N/A",
    };

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}
