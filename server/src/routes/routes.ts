import { Router } from "express";
import { sigin } from "../contorllers/users";
import { allEmployees } from "../contorllers/allemplyees";
import { editEmployee, newEmployee } from "../contorllers/adminOps";
import { getEmployeeById } from "../contorllers/specficEmployee";

const router = Router();

router.post("/signin", sigin);
router.get("/employees", allEmployees);
router.post("/newemployee", newEmployee);
router.put("/editemployees/:userId", editEmployee);
router.get("/employee/:userId", getEmployeeById);
// router.post("/signup", (req, res) => {});

export default router;
