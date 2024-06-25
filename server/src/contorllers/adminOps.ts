import pool from "../models/db";
import { Request, Response } from "express";

interface Employee {
  employee_code: string;
  name: string;
  email: string;
  is_admin: boolean;
  password: string;
  full_name: string;
  date_of_birth: string; // Adjust type if using a date object or a different format
  gender: string;
  age: number;
  current_address: string;
  permanent_address: string;
  mobile: string;
  personal_mail: string;
  emergency_contact_name: string;
  emergency_contact_mobile: string;
}

export async function newEmployee(req: Request, res: Response) {
  try {
    const {
      employee_code,
      name,
      email,
      password,
      is_admin,
      full_name,
      date_of_birth,
      gender,
      age,
      current_address,
      permanent_address,
      mobile,
      personal_mail,
      emergency_contact_name,
      emergency_contact_mobile,
      company_mail,
      office_phone,
      city,
      office_address,
      reporting_manager,
      hr_name,
      employment_history,
      date_of_joining,
      project_code,
      project_start_date,
      project_end_date,
      client_name,
      project_reporting_manager,
      pancard,
      aadharcard,
      bank_name,
      branch,
      ifsc_code,
      ctc_breakup,
    } = req.body;

    console.log(req.body);
    // return;

    await pool.query("BEGIN");

    const userInsertQuery = `
        INSERT INTO users (employee_code, name, email, password, is_admin)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING user_id;`;
    if (!name && !email && !password && !is_admin)
      return res.json({
        message: " name and emil and passowrd and is_admin",
      });
    const userResult = await pool.query(userInsertQuery, [
      employee_code ?? null,
      name ?? null,
      email ?? null,
      password ?? null,
      is_admin ?? false,
    ]);
    const userId = userResult.rows[0].user_id;

    const personalDetailsInsertQuery = `
        INSERT INTO personal_details (user_id, full_name, date_of_birth, gender, age, current_address, permanent_address, mobile, personal_mail, emergency_contact_name, emergency_contact_mobile)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING employee_id;
    `;
    const personalDetailsResult = await pool.query(personalDetailsInsertQuery, [
      userId,
      full_name ?? null,
      date_of_birth ?? null,
      gender ?? null,
      age ?? null,
      current_address ?? null,
      permanent_address ?? null,
      mobile ?? null,
      personal_mail ?? null,
      emergency_contact_name ?? null,
      emergency_contact_mobile ?? null,
    ]);
    const employeeId = personalDetailsResult.rows[0].employee_id;

    const professionalDetailsInsertQuery = `
        INSERT INTO professional_details (employee_id, user_id, company_mail, office_phone, city, office_address, reporting_manager, hr_name, employment_history, date_of_joining)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;
    await pool.query(professionalDetailsInsertQuery, [
      employeeId,
      userId,
      company_mail ?? null,
      office_phone ?? null,
      city ?? null,
      office_address ?? null,
      reporting_manager ?? null,
      hr_name ?? null,
      employment_history ?? null,
      date_of_joining ?? null,
    ]);

    const projectDetailsInsertQuery = `
        INSERT INTO project_details (employee_id, user_id, project_code, start_date, end_date, client_name, reporting_manager)
        VALUES ($1, $2, $3, $4, $5, $6, $7);
    `;
    await pool.query(projectDetailsInsertQuery, [
      employeeId,
      userId,
      project_code ?? null,
      project_start_date ?? null,
      project_end_date ?? null,
      client_name ?? null,
      project_reporting_manager ?? null,
    ]);

    const financeDetailsInsertQuery = `
        INSERT INTO finance_details (employee_id, user_id, pancard, aadharcard, bank_name, branch, ifsc_code, ctc_breakup)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    await pool.query(financeDetailsInsertQuery, [
      employeeId,
      userId,
      pancard ?? "",
      aadharcard ?? "",
      bank_name ?? "",
      branch ?? "",
      ifsc_code ?? "",
      ctc_breakup ?? "",
    ]);

    await pool.query("COMMIT");
    res.status(201).send({ message: "Employee added successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error adding employee:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

export async function editEmployee(req: Request, res: Response) {
  const { userId } = req.params;
  const employee = req.body;

  try {
    await pool.query("BEGIN");

    const userResult = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [userId]
    );
    if (userResult.rows.length === 0) {
      res.status(404).send("Employee not found");
      return;
    }
    const currentUser = userResult.rows[0];

    // Fetch existing personal details
    const personalResult = await pool.query(
      "SELECT * FROM personal_details WHERE user_id = $1",
      [userId]
    );
    const currentPersonal = personalResult.rows[0];

    // Fetch existing professional details
    const professionalResult = await pool.query(
      "SELECT * FROM professional_details WHERE user_id = $1",
      [userId]
    );
    const currentProfessional = professionalResult.rows[0];

    // Fetch existing finance details
    const financeResult = await pool.query(
      "SELECT * FROM finance_details WHERE user_id = $1",
      [userId]
    );
    const currentFinance = financeResult.rows[0];

    // Merge existing details with new details
    const updatedUser = {
      employee_code: employee.employee_code || currentUser.employee_code,
      name: employee.name || currentUser.name,
      email: employee.email || currentUser.email,
    };

    const updatedPersonal = {
      full_name: employee.full_name || currentPersonal.full_name,
      date_of_birth: employee.date_of_birth || currentPersonal.date_of_birth,
      gender: employee.gender || currentPersonal.gender,
      age: employee.age || currentPersonal.age,
      current_address:
        employee.current_address || currentPersonal.current_address,
      permanent_address:
        employee.permanent_address || currentPersonal.permanent_address,
      mobile: employee.mobile || currentPersonal.mobile,
      personal_mail: employee.personal_mail || currentPersonal.personal_mail,
      emergency_contact_name:
        employee.emergency_contact_name ||
        currentPersonal.emergency_contact_name,
      emergency_contact_mobile:
        employee.emergency_contact_mobile ||
        currentPersonal.emergency_contact_mobile,
    };

    const updatedProfessional = {
      company_mail: employee.company_mail || currentProfessional.company_mail,
      office_phone: employee.office_phone || currentProfessional.office_phone,
      city: employee.city || currentProfessional.city,
      office_address:
        employee.office_address || currentProfessional.office_address,
      reporting_manager:
        employee.reporting_manager || currentProfessional.reporting_manager,
      hr_name: employee.hr_name || currentProfessional.hr_name,
      employment_history:
        employee.employment_history || currentProfessional.employment_history,
      date_of_joining:
        employee.date_of_joining || currentProfessional.date_of_joining,
    };

    const updatedFinance = {
      pancard: employee.pancard || currentFinance.pancard,
      aadharcard: employee.aadharcard || currentFinance.aadharcard,
      bank_name: employee.bank_name || currentFinance.bank_name,
      branch: employee.branch || currentFinance.branch,
      ifsc_code: employee.ifsc_code || currentFinance.ifsc_code,
      ctc_breakup: employee.ctc_breakup || currentFinance.ctc_breakup,
    };

    // Update User Table
    const updateUserQuery = `
      UPDATE users
      SET employee_code = $1, name = $2, email = $3
      WHERE user_id = $4
    `;
    await pool.query(updateUserQuery, [
      updatedUser.employee_code,
      updatedUser.name,
      updatedUser.email,
      userId,
    ]);

    // Update Personal Details Table
    const updatePersonalDetailsQuery = `
      UPDATE personal_details
      SET full_name = $1, date_of_birth = $2, gender = $3, age = $4,
          current_address = $5, permanent_address = $6, mobile = $7,
          personal_mail = $8, emergency_contact_name = $9, emergency_contact_mobile = $10
      WHERE user_id = $11
    `;
    await pool.query(updatePersonalDetailsQuery, [
      updatedPersonal.full_name,
      updatedPersonal.date_of_birth,
      updatedPersonal.gender,
      updatedPersonal.age,
      updatedPersonal.current_address,
      updatedPersonal.permanent_address,
      updatedPersonal.mobile,
      updatedPersonal.personal_mail,
      updatedPersonal.emergency_contact_name,
      updatedPersonal.emergency_contact_mobile,
      userId,
    ]);

    // Update Professional Details Table
    const updateProfessionalDetailsQuery = `
      UPDATE professional_details
      SET company_mail = $1, office_phone = $2, city = $3, office_address = $4,
          reporting_manager = $5, hr_name = $6, employment_history = $7, date_of_joining = $8
      WHERE user_id = $9
    `;
    await pool.query(updateProfessionalDetailsQuery, [
      updatedProfessional.company_mail,
      updatedProfessional.office_phone,
      updatedProfessional.city,
      updatedProfessional.office_address,
      updatedProfessional.reporting_manager,
      updatedProfessional.hr_name,
      updatedProfessional.employment_history,
      updatedProfessional.date_of_joining,
      userId,
    ]);

    // Update Project Details Table
    if (employee.project_details) {
      // Delete existing project details for the user
      const deleteProjectDetailsQuery = `
        DELETE FROM project_details WHERE user_id = $1
      `;
      await pool.query(deleteProjectDetailsQuery, [userId]);

      // Insert new project details
      const insertProjectDetailsQuery = `
        INSERT INTO project_details (employee_id, user_id, project_code, start_date, end_date, client_name, reporting_manager)
        VALUES ((SELECT employee_id FROM personal_details WHERE user_id = $1), $1, $2, $3, $4, $5, $6)
      `;
      for (const project of employee.project_details) {
        await pool.query(insertProjectDetailsQuery, [
          userId,
          project.project_code,
          project.start_date,
          project.end_date,
          project.client_name,
          project.reporting_manager,
        ]);
      }
    }

    // Update Finance Details Table
    const updateFinanceDetailsQuery = `
      UPDATE finance_details
      SET pancard = $1, aadharcard = $2, bank_name = $3, branch = $4, ifsc_code = $5, ctc_breakup = $6
      WHERE user_id = $7
    `;
    await pool.query(updateFinanceDetailsQuery, [
      updatedFinance.pancard,
      updatedFinance.aadharcard,
      updatedFinance.bank_name,
      updatedFinance.branch,
      updatedFinance.ifsc_code,
      updatedFinance.ctc_breakup,
      userId,
    ]);

    await pool.query("COMMIT");
    res.status(200).send("Employee updated successfully");
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error updating employee:", error);
    res.status(500).send("Error updating employee");
  }
}
