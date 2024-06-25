import pool from "../models/db";
import { Request, Response } from "express";
//@ts-ignore
import jwt from "jsonwebtoken";

export async function sigin(req: Request, res: Response) {
  const { usercode, password }: any = req.body;
  console.log(usercode, password);

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE (employee_code = $1 OR email = $1) AND password = $2",
      [usercode, password]
    );
    if (result.rows.length === 1) {
      const user = {
        UserID: result.rows[0].user_id,
        UserCode: result.rows[0].employee_code,
        FirstName: result.rows[0].name,
        Email: result.rows[0].email,
        IsAdmin: result.rows[0].is_admin,
      };
      const userId = user.UserID;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "Login successful",
        user,
        userId,
        token,
        isadmin: user.IsAdmin,
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
