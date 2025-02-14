import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

// Enroll a student in a course
export const enrollStudent = async (req, res) => {
  const { student_id, course_id } = req.body;

  try {
    const course = await Course.findById(course_id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const student = await User.findById(student_id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const existingEnrollment = await Enrollment.findOne({ student_id, course_id });
    if (existingEnrollment) return res.status(400).json({ message: "Student already enrolled in this course" });

    const enrollment = await Enrollment.create({ student_id, course_id });

    course.students.push(student_id);
    await course.save();

    res.status(201).json({ message: "Student enrolled successfully", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all enrollments
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("student_id", "name email").populate("course_id", "lectureTitle");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get enrollments by student ID
export const getEnrollmentsByStudent = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student_id: req.params.student_id }).populate("course_id", "lectureTitle");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove a student from a course
export const removeEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).json({ message: "Enrollment not found" });

    await Course.findByIdAndUpdate(enrollment.course_id, { $pull: { students: enrollment.student_id } });

    res.status(200).json({ message: "Enrollment removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
