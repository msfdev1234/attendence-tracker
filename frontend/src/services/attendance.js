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
