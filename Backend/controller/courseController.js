import Course from "../models/Course.js";

// Create a New Course
export const createCourse = async (req, res) => {
  const courseData = req.body;

  try {
    const existingCourse = await Course.findOne({ CRN: courseData.CRN });
    if (existingCourse) return res.status(400).json({ message: "Course with this CRN already exists" });

    const newCourse = await Course.create(courseData);
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("students", "name email");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("students", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
