import express from "express";
import {
  enrollStudent,
  getEnrollments,
  getEnrollmentsByStudent,
  removeEnrollment,
} from "../controller/enrollmentController.js";

const router = express.Router();

router.post("/", enrollStudent);
router.get("/", getEnrollments);
router.get("/:student_id", getEnrollmentsByStudent);
router.delete("/:id", removeEnrollment);

export default router;
