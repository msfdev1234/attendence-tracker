import AttendanceModel from "../models/AttendanceModel";

const attendanceModel = new AttendanceModel();

export const addAttendance = async (attendanceData) => {
  try {
    return await attendanceModel.addAttendance(attendanceData);
  } catch (error) {
    console.error("Error adding attendance:", error);
    throw error;
  }
};

export const getAttendanceForStudent = async (studentId, courseId) => {
  try {
    const attendanceModel = new AttendanceModel();
    return await attendanceModel.getStudentAttendance(studentId, courseId);
  } catch (error) {
    console.error("Error getting student attendance:", error);
    throw error;
  }
};
