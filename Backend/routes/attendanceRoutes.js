import express from "express";
import {
  markAttendance,
  getAttendanceRecords,
  getAttendanceByStudent,
} from "../controller/attendanceController.js";

const router = express.Router();

router.post("/", markAttendance);
router.get("/", getAttendanceRecords);
router.get("/:student_id", getAttendanceByStudent);

export default router;
