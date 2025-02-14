import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controller/courseController.js";

const router = express.Router();

// Create a New Course
router.post("/", createCourse);

// Get All Courses
router.get("/", getCourses);

// Get a Single Course by ID
router.get("/:id", getCourseById);

// Update a Course
router.put("/:id", updateCourse);

// Delete a Course
router.delete("/:id", deleteCourse);

export default router;
