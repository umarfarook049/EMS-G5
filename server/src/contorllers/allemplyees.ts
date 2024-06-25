import pool from "../models/db";
import { Request, Response } from "express";

export async function allEmployees(req: Request, res: Response) {
  try {
    const result = await pool.query(`
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
      WHERE u.is_admin = FALSE;
    `);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
}
