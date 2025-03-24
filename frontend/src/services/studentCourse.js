import StudentCourseModel from "../models/StudentCourseModel";

export const registerCourse = async (data) => {
  try {
    const studentCourse = new StudentCourseModel();
    await studentCourse.registerCourse(data);
  } catch (error) {
    console.error(
      "🚀 ~ file: studentCourse.js ~ line 7 ~ registerCourse ~ error",
      error
    );
    throw error;
  }
};

export const registeredCourses = async (studentId) => {
  try {
    const studentCourse = new StudentCourseModel();
    return await studentCourse.getRegisteredCoursesForStudent(studentId);
  } catch (error) {
    console.error(
      "🚀 ~ file: studentCourse.js ~ line 7 ~ registerCourse ~ error",
      error
    );
    throw error;
  }
};

export const courseStudents = async (courseId) => {
  try {
    const studentCourse = new StudentCourseModel();
    return await studentCourse.getCourseStudents(courseId);
  } catch (error) {
    console.log("🚀 ~ courseStudents ~ error:", error);
    throw error;
  }
};
