import Attendance from "../models/Attendance.js";
import Enrollment from "../models/Enrollment.js";

// Mark attendance
export const markAttendance = async (req, res) => {
  const { student_id, course_id, status } = req.body;

  try {
    const enrollment = await Enrollment.findOne({ student_id, course_id });
    if (!enrollment) return res.status(400).json({ message: "Student is not enrolled in this course" });

    const attendance = await Attendance.create({ student_id, course_id, status });

    res.status(201).json({ message: "Attendance marked successfully", attendance });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all attendance records
export const getAttendanceRecords = async (req, res) => {
  try {
    const records = await Attendance.find().populate("student_id", "name email").populate("course_id", "lectureTitle");
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get attendance records by student ID
export const getAttendanceByStudent = async (req, res) => {
  try {
    const records = await Attendance.find({ student_id: req.params.student_id }).populate("course_id", "lectureTitle");
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
